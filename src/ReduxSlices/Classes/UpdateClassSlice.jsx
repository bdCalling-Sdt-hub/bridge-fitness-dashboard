
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    progress: 0,
};

export const UpdateClass = createAsyncThunk(
    "UpdateClass",
    async ({ id, data, onUploadProgress }, thunkAPI) => {
        try {
            let response = await baseAxios.patch(`/class/edit/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                onUploadProgress,
            });
            return response.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const UpdateClassSlice = createSlice({
    name: "UpdateClass",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
            state.progress = 0;
        },
        setUpdateProgress: (state, action) => {
            state.progress = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(UpdateClass.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(UpdateClass.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
            state.progress = 100;
        });
        builder.addCase(UpdateClass.rejected, (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload;
            state.progress = 0;
        });
    },
});

export const { reset, setUpdateProgress } = UpdateClassSlice.actions;

export default UpdateClassSlice.reducer;
