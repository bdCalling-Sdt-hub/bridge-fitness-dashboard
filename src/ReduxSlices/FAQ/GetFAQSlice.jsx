import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    FAQData: [],
};

export const GetFAQ = createAsyncThunk(
    "GetFAQ",
    async (value, thunkAPI) => {
        try {
            let response = await baseAxios.get("/manage/get-faq", {
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

export const GetFAQSlice = createSlice({
    name: "GetFAQ",
    initialState,

    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(GetFAQ.pending, (state, { payload }) => {
            state.isLoading = true;
        });
        builder.addCase(GetFAQ.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
            state.FAQData = payload.data;
        });
        builder.addCase(GetFAQ.rejected, (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message;
        });
    },
});

// Action creators are generated for each case reducer function
export const { reset } = GetFAQSlice.actions;

export default GetFAQSlice.reducer;
