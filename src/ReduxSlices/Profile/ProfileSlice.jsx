import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from '../../../Config';
const initialState = {
    error: false,
    success: false,
    loading: true,
    isSuccess: false,
    user: {},
};

export const Profile = createAsyncThunk(
    'Profile',
    async (value, thunkApi) => {
        try {
            const response = await baseAxios.get(`/auth/admin/profile`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(response)
            return response?.data.data;
        } catch (error) {
            const axiosError =  AxiosError;
            const message = axiosError?.response?.data;
            return thunkApi.rejectWithValue(message);
        }
    }
)
export const ProfileSlice = createSlice({
    name: 'Profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(Profile.pending, (state) => {
            state.loading = true;
            state.isSuccess = false
        }),
            builder.addCase(Profile.fulfilled, (state, action) => {
                state.error = false;
                state.success = true;
                state.loading = false;
                state.isSuccess = true;
                state.user = action.payload;
            }),
            builder.addCase(Profile.rejected, (state) => {
                state.error = true;
                state.success = false;
                state.loading = false;
                state.isSuccess = false;
                state.user = {}
            })
    }
})
export default ProfileSlice.reducer