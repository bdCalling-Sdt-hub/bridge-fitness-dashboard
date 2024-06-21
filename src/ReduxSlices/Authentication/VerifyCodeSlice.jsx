import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from '../../../Config';
const initialState = {
    error: false,
    success: false,
    loading: false,
    isSuccess: false,
    user: {},
};

export const VerifyCode = createAsyncThunk(
    'VerifyCode',
    async (value, thunkApi) => {
        try {
            //console.log({ code: value.code, email: value.email })
            const response = await baseAxios.post(`/auth/verify-otp`, { code: value.code, email: value.email }, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            //console.log(response)
            return response?.data.data;
        } catch (error) {
            const axiosError = AxiosError;
            const message = axiosError?.response?.data;
            return thunkApi.rejectWithValue(message);
        }
    }
)
export const VerifyCodeSlice = createSlice({
    name: 'VerifyCode',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(VerifyCode.pending, (state) => {
            state.loading = true;
            state.isSuccess = false
        }),
            builder.addCase(VerifyCode.fulfilled, (state, action) => {
                state.error = false;
                state.success = true;
                state.loading = false;
                state.isSuccess = true;
                state.user = action.payload;
            }),
            builder.addCase(VerifyCode.rejected, (state) => {
                state.error = true;
                state.success = false;
                state.loading = false;
                state.isSuccess = false;
                state.user = {}
            })
    }
})
export default VerifyCodeSlice.reducer