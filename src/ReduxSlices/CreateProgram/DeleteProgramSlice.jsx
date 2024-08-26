import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};


export const DeleteProgram = createAsyncThunk(
    "DeleteProgram",
    async (value, thunkAPI) => {
        try {
            let response = await baseAxios.delete(`/program/delete/${value.id}`, {
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
export const DeleteProgramSlice = createSlice({
    name: "DeleteProgram",
    initialState,

    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(DeleteProgram.pending, (state, { payload }) => {
            state.isLoading = true;

        })
        builder.addCase(DeleteProgram.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
        })
        builder.addCase(DeleteProgram.rejected, (state, { payload }) => {

            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message
        })
    },

});

export const { reset } = DeleteProgramSlice.actions;

export default DeleteProgramSlice.reducer;