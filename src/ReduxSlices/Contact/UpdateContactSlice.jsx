import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const UpdateContact = createAsyncThunk(
    "UpdateContact",
    async (value, thunkAPI) => {
        const {id,...otherValue}=value
        try {
            let response = await baseAxios.patch(`/manage/edit-contact-info/${id}`,otherValue, {
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

export const UpdateContactSlice = createSlice({
    name: "UpdateContact",
    initialState,

    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(UpdateContact.pending, (state, { payload }) => {
            state.isLoading = true;
        });
        builder.addCase(UpdateContact.fulfilled, (state, { payload }) => {
            console.log(payload);
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
        });
        builder.addCase(UpdateContact.rejected, (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message;
        });
    },
});

// Action creators are generated for each case reducer function
export const { reset } = UpdateContactSlice.actions;

export default UpdateContactSlice.reducer;
