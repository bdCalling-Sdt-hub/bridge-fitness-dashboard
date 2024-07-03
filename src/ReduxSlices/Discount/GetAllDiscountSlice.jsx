import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    Discounts: [],
};

export const AllDiscount = createAsyncThunk(
    "AllDiscount",
    async (value, thunkAPI) => {
        try {
            let token = localStorage.getItem("token");
            let response = await baseAxios.get("/discount/get-all", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
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

export const AllDiscountSlice = createSlice({
    name: "AllDiscount",
    initialState,

    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
            state.Discounts = [];
            state.accessToken = "";
        },
    },

    extraReducers: (builder) => {
        builder.addCase(AllDiscount.pending, (state, { payload }) => {
            state.isLoading = true;
        });
        builder.addCase(AllDiscount.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
            state.Discounts = payload.data;
        });
        builder.addCase(AllDiscount.rejected, (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message;
        });
    },
});

// Action creators are generated for each case reducer function
export const { reset } = AllDiscountSlice.actions;

export default AllDiscountSlice.reducer;
