import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    ContactData: [],
};

export const GetContact = createAsyncThunk(
    "GetContact",
    async (value, thunkAPI) => {
        try {
            let response = await baseAxios.get("/manage/get-contact-info", {
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

export const GetContactSlice = createSlice({
    name: "GetContact",
    initialState,

    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(GetContact.pending, (state, { payload }) => {
            state.isLoading = true;
        });
        builder.addCase(GetContact.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
            state.ContactData = payload.data;
        });
        builder.addCase(GetContact.rejected, (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message;
        });
    },
});

// Action creators are generated for each case reducer function
export const { reset } = GetContactSlice.actions;

export default GetContactSlice.reducer;
