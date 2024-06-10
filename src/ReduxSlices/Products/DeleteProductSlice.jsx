import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};


export const DeleteProducts = createAsyncThunk(
    "DeleteProducts",
    async (value, thunkAPI) => {
        try {
            console.log(`/post/delete-product/${value.id}`)
            let response = await baseAxios.delete(`/product/delete/${value.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            return response.data;
        } catch (error) {
            const message = error?.response?.data?.message
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const DeleteProductsSlice = createSlice({
    name: "DeleteProducts",
    initialState,

    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(DeleteProducts.pending, (state, { payload }) => {
            state.isLoading = true;

        })
        builder.addCase(DeleteProducts.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
            state.products = payload.data
            state.meta = payload.meta
            // console.log(payload)
        })
        builder.addCase(DeleteProducts.rejected, (state, { payload }) => {

            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message
        })
    },

});

export const { reset } = DeleteProductsSlice.actions;

export default DeleteProductsSlice.reducer;