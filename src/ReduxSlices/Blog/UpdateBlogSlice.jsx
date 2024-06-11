import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};


export const UpdateBlog = createAsyncThunk(
    "UpdateBlog",
    async (value, thunkAPI) => {
        const {id, data}= value;
        try {
            let response = await baseAxios.patch(`/blog/edit/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(response.data)

            return response.data;
        } catch (error) {
            console.log(error)
            const message = error?.response?.data?.message
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const UpdateBlogSlice = createSlice({
    name: "UpdateBlog",
    initialState,

    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
            state.accessToken = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(UpdateBlog.pending, (state, { payload }) => {
            state.isLoading = true;

        })
        builder.addCase(UpdateBlog.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
            // console.log(payload)
        })
        builder.addCase(UpdateBlog.rejected, (state, { payload }) => {

            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message

        })
    },

});

export const { reset } = UpdateBlogSlice.actions;

export default UpdateBlogSlice.reducer;