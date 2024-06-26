import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState= {
    error: false,
    success: false,
    loading: false,
    isSuccess: false,
    AllBlog: [],
    meta: null

};

export const GetAllBlog = createAsyncThunk(
    'GetAllBlog',
    async (value , thunkApi) => {
        try {
            const response = await baseAxios.get(`/blog/get-all?page=${value?.page}&limit=${value?.limit}`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            return response?.data;
        } catch (errors) {
            const message = errors;
            return thunkApi.rejectWithValue(message);
        }
    }
)
export const GetAllBlogSlice = createSlice({
    name: 'GetAllBlog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetAllBlog.pending, (state) => {
            state.loading = true;
            state.isSuccess = false
        }),
            builder.addCase(GetAllBlog.fulfilled, (state, action) => {
                state.error = false;
                state.success = true;
                state.loading = false;
                state.isSuccess = true;
                state.AllBlog = action.payload.data;
                state.meta = action.payload.meta;
            }),
            builder.addCase(GetAllBlog.rejected, (state) => {
                state.error = true;
                state.success = false;
                state.loading = false;
                state.AllBlog = []
                state.meta = null
            })
    }
})
export default GetAllBlogSlice.reducer