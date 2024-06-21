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

export const ForgetPass = createAsyncThunk(
    'ForgetPass',
    async (value, thunkApi) => {
        try {
            const response = await baseAxios.post(`/auth/forgot-password`, { email: value.email });
            return response?.data;
        } catch (error) {
            console.log(error)
            const axiosError = AxiosError;
            const message = axiosError?.response?.data;
            return thunkApi.rejectWithValue(message);
        }
    }
)
export const ForgetPassSlice = createSlice({
    name: 'ForgetPass',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(ForgetPass.pending, (state) => {
            state.loading = true;
            state.isSuccess = false
        }),
            builder.addCase(ForgetPass.fulfilled, (state, action) => {
                state.error = false;
                state.success = true;
                state.loading = false;
                state.isSuccess = true;
                state.user = action.payload;
            }),
            builder.addCase(ForgetPass.rejected, (state) => {
                state.error = true;
                state.success = false;
                state.loading = false;
                state.isSuccess = false;
                state.user = {}
            })
    }
})
export default ForgetPassSlice.reducer