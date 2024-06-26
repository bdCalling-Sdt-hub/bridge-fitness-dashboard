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

export const ChangePass = createAsyncThunk(
    'ChangePass',
    async (value, thunkApi) => {
        try {
            const response = await baseAxios.patch(`/auth/change-password`, { oldPassword: value.oldPassword, newPassword: value.newPassword }, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            return response?.data.data;
        } catch (error) {
            const axiosError =  AxiosError;
            const message = axiosError?.response?.data;
            return thunkApi.rejectWithValue(message);
        }
    }
)
export const ChangePassSlice = createSlice({
    name: 'ChangePass',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(ChangePass.pending, (state) => {
            state.loading = true;
            state.isSuccess = false
        }),
            builder.addCase(ChangePass.fulfilled, (state, action) => {
                state.error = false;
                state.success = true;
                state.loading = false;
                state.isSuccess = true;
                state.user = action.payload;
            }),
            builder.addCase(ChangePass.rejected, (state) => {
                state.error = true;
                state.success = false;
                state.loading = false;
                state.isSuccess = false;
                state.user = {}
            })
    }
})
export default ChangePassSlice.reducer
