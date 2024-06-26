import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import baseAxios from "../../../Config";
const initialState = {
    error: false,
    success: false,
    loading: false,
    isSuccess: false,
    Feedback: [],
    meta: null
};

export const ApproveFeedback = createAsyncThunk(
    'ApproveFeedback',
    async (value, thunkApi) => {
        try {
            const response = await baseAxios.patch(`/feedback/approve/${value?.id}`,{}, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            return response?.data.data;
        } catch (error) {
            const axiosError = AxiosError;
            const message = axiosError?.response?.data;
            return thunkApi.rejectWithValue(message);
        }
    }
)
export const ApproveFeedbackSlice = createSlice({
    name: 'ApproveFeedback',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(ApproveFeedback.pending, (state) => {
            state.loading = true;
            state.isSuccess = false
        }),
            builder.addCase(ApproveFeedback.fulfilled, (state, action) => {
                state.error = false;
                state.success = true;
                state.loading = false;
                state.isSuccess = true;
                state.Feedback = action.payload.data;
                state.meta = action.payload.meta
            }),
            builder.addCase(ApproveFeedback.rejected, (state) => {
                state.error = true;
                state.success = false;
                state.loading = false;
                state.Feedback = []
                state.meta = null
            })
    }
})
export default ApproveFeedbackSlice.reducer