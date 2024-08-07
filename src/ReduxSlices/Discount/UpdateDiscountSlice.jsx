import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    userData: [],
};

export const UpdateDiscount = createAsyncThunk(
    "UpdateDiscount",
    async (value, thunkAPI) => {
        const {id,data}=value
        try {
            let response = await baseAxios.patch(`/discount/edit/${id}`,data, {
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

export const UpdateDiscountSlice = createSlice({
    name: "UpdateDiscount",
    initialState,

    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(UpdateDiscount.pending, (state, { payload }) => {
            state.isLoading = true;
        });
        builder.addCase(UpdateDiscount.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
            state.userData = payload.data;
        });
        builder.addCase(UpdateDiscount.rejected, (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message;
        });
    },
});

// Action creators are generated for each case reducer function
export const { reset } = UpdateDiscountSlice.actions;

export default UpdateDiscountSlice.reducer;
