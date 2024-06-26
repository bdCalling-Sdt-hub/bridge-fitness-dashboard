import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    userData: [],
};

export const DeleteFAQ = createAsyncThunk(
    "DeleteFAQ",
    async (value, thunkAPI) => {
        const {id}=value
        try {
            let response = await baseAxios.delete(`/manage/delete-faq/${id}`, {
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

export const DeleteFAQSlice = createSlice({
    name: "DeleteFAQ",
    initialState,

    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(DeleteFAQ.pending, (state, { payload }) => {
            state.isLoading = true;
        });
        builder.addCase(DeleteFAQ.fulfilled, (state, { payload }) => {

            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
            state.userData = payload.data;
        });
        builder.addCase(DeleteFAQ.rejected, (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message;
        });
    },
});

// Action creators are generated for each case reducer function
export const { reset } = DeleteFAQSlice.actions;

export default DeleteFAQSlice.reducer;
