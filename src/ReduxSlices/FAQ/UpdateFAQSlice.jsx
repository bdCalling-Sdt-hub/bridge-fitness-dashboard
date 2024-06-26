import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    userData: [],
};

export const UpdateFAQ = createAsyncThunk(
    "UpdateFAQ",
    async (value, thunkAPI) => {
        const {id,...otherValue}=value
        try {
            let response = await baseAxios.patch(`/manage/edit-faq/${id}`,otherValue, {
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

export const UpdateFAQSlice = createSlice({
    name: "UpdateFAQ",
    initialState,

    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(UpdateFAQ.pending, (state, { payload }) => {
            state.isLoading = true;
        });
        builder.addCase(UpdateFAQ.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
            state.userData = payload.data;
        });
        builder.addCase(UpdateFAQ.rejected, (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message;
        });
    },
});

// Action creators are generated for each case reducer function
export const { reset } = UpdateFAQSlice.actions;

export default UpdateFAQSlice.reducer;
