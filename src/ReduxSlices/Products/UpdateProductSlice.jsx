import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};


export const UpdateProduct = createAsyncThunk(
    "UpdateProduct",
    async (value, thunkAPI) => {
        const {id, data}= value;
        try {
            let response = await baseAxios.patch(`/product/edit/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
export const UpdateProductSlice = createSlice({
    name: "UpdateProduct",
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
        builder.addCase(UpdateProduct.pending, (state, { payload }) => {
            state.isLoading = true;

        })
        builder.addCase(UpdateProduct.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
        })
        builder.addCase(UpdateProduct.rejected, (state, { payload }) => {

            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message

        })
    },

});

export const { reset } = UpdateProductSlice.actions;

export default UpdateProductSlice.reducer;