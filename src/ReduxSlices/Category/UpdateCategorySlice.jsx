import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    userData: [],
};

export const UpdateCategory = createAsyncThunk(
    "UpdateCategory",
    async (value, thunkAPI) => {
        const {id,data}=value
        try {
            let response = await baseAxios.patch(`/program/edit/${id}`,data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return response.data;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const UpdateCategorySlice = createSlice({
    name: "UpdateCategory",
    initialState,

    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(UpdateCategory.pending, (state, { payload }) => {
            state.isLoading = true;
        });
        builder.addCase(UpdateCategory.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
            state.userData = payload.data;
        });
        builder.addCase(UpdateCategory.rejected, (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message;
        });
    },
});

// Action creators are generated for each case reducer function
export const { reset } = UpdateCategorySlice.actions;

export default UpdateCategorySlice.reducer;
