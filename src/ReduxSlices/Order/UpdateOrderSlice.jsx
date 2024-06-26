import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};
export const UpdateOrder = createAsyncThunk(
    "UpdateOrder",
    async (value, thunkAPI) => {
        const {id, data}= value;
        try {
            let response = await baseAxios.patch(`/order/update/${id}`, data, {
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
export const UpdateOrderSlice = createSlice({
    name: "UpdateOrder",
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
        builder.addCase(UpdateOrder.pending, (state, { payload }) => {
            state.isLoading = true;

        })
        builder.addCase(UpdateOrder.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
        })
        builder.addCase(UpdateOrder.rejected, (state, { payload }) => {

            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message

        })
    },

});

export const { reset } = UpdateOrderSlice.actions;

export default UpdateOrderSlice.reducer;