import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const AddContact = createAsyncThunk(
    "AddContact",
    async (value, thunkAPI) => {
        try {
            let response = await baseAxios.post(`/manage/add-contact-info/`,value, {
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

export const AddContactSlice = createSlice({
    name: "AddContact",
    initialState,

    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(AddContact.pending, (state, { payload }) => {
            state.isLoading = true;
        });
        builder.addCase(AddContact.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
        });
        builder.addCase(AddContact.rejected, (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message;
        });
    },
});

// Action creators are generated for each case reducer function
export const { reset } = AddContactSlice.actions;

export default AddContactSlice.reducer;
