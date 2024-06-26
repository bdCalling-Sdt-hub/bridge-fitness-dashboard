import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    userData: [],
};

export const AddFAQ = createAsyncThunk(
    "AddFAQ",
    async (value, thunkAPI) => {
        try {
            let response = await baseAxios.post("/manage/add-faq",value, {
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

export const AddFAQSlice = createSlice({
    name: "AddFAQ",
    initialState,

    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(AddFAQ.pending, (state, { payload }) => {
            state.isLoading = true;
        });
        builder.addCase(AddFAQ.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
            state.userData = payload.data;
        });
        builder.addCase(AddFAQ.rejected, (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message;
        });
    },
});

// Action creators are generated for each case reducer function
export const { reset } = AddFAQSlice.actions;

export default AddFAQSlice.reducer;
