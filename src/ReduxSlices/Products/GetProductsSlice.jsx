import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    products :[],
    meta : {}
};


export const GetProducts = createAsyncThunk(
    "GetProducts",
    async (value, thunkAPI) => {
        try {
            let response = await baseAxios.get(`/product/products?page=${value.page}&limit=${value.limit}&searchTerm=${value.searchTerm}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            return response.data.data;
        } catch (error) {
            const message = error?.response?.data?.message
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const GetProductsSlice = createSlice({
    name: "GetProducts",
    initialState,

    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
            state.accessToken = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(GetProducts.pending, (state, { payload }) => {
            state.isLoading = true;

        })
        builder.addCase(GetProducts.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
            state.products = payload.data
            state.meta = payload.meta
            // console.log(payload)
        })
        builder.addCase(GetProducts.rejected, (state, { payload }) => {

            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message
            state.products = []
            state.meta = {}

        })
    },

});

export const { reset } = GetProductsSlice.actions;

export default GetProductsSlice.reducer;