import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};


export const DeleteClass = createAsyncThunk(
    "DeleteClass",
    async (value, thunkAPI) => {
        try {
            let response = await baseAxios.delete(`/class/delete/${value.id}`, {
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
export const DeleteClassSlice = createSlice({
    name: "DeleteClass",
    initialState,

    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(DeleteClass.pending, (state, { payload }) => {
            state.isLoading = true;

        })
        builder.addCase(DeleteClass.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
        })
        builder.addCase(DeleteClass.rejected, (state, { payload }) => {

            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message
        })
    },

});

export const { reset } = DeleteClassSlice.actions;

export default DeleteClassSlice.reducer;