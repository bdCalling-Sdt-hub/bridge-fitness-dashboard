import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};


export const DeleteCategory = createAsyncThunk(
    "DeleteCategory",
    async (value, thunkAPI) => {
        try {
            let response = await baseAxios.delete(`/series/catagory/${value.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            return response.data;
        } catch (error) {
            const message = error?.response?.data?.message
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const DeleteCategorySlice = createSlice({
    name: "DeleteCategory",
    initialState,

    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(DeleteCategory.pending, (state, { payload }) => {
            state.isLoading = true;

        })
        builder.addCase(DeleteCategory.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
        })
        builder.addCase(DeleteCategory.rejected, (state, { payload }) => {

            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message
        })
    },

});

export const { reset } = DeleteCategorySlice.actions;

export default DeleteCategorySlice.reducer;