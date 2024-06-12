import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import baseAxios from "../../../Config";

const initialState = {
    error: false,
    success: false,
    loading: false,
    isSuccess: false,
    AboutUs: [],
};

export const GetAboutContent = createAsyncThunk(
    'GetAboutContent',
    async (value, thunkApi) => {
        try {
            const response = await baseAxios.get(`/manage/get-about-us`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            return response?.data.data;
        } catch (error) {
            const axiosError = AxiosError;
            const message = axiosError?.response?.data;
            return thunkApi.rejectWithValue(message);
        }
    }
)
export const GetAboutContentSlice = createSlice({
    name: 'GetAboutContent',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetAboutContent.pending, (state) => {
            state.loading = true;
            state.isSuccess = false
        }),
            builder.addCase(GetAboutContent.fulfilled, (state, action) => {
                state.error = false;
                state.success = true;
                state.loading = false;
                state.isSuccess = true;
                state.AboutUs = action.payload
            }),
            builder.addCase(GetAboutContent.rejected, (state) => {
                state.error = true;
                state.success = false;
                state.loading = false;
                state.AboutUs = []
            })
    }
})
export default GetAboutContentSlice.reducer