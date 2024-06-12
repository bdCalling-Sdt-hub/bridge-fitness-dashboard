import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import baseAxios from "../../../Config";

const initialState = {
    error: false,
    success: false,
    loading: false,
    isSuccess: false,
    TermsConditionsData: [],
};

export const TermsConditions = createAsyncThunk(
    'TermsConditions',
    async (value, thunkApi) => {
        try {
            const response = await baseAxios.get(`/manage/get-terms-conditions`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            return response?.data.data;
        } catch (error) {
            const axiosError =  AxiosError;
            const message = axiosError?.response?.data;
            return thunkApi.rejectWithValue(message);
        }
    }
)
export const TermsConditionsSlice = createSlice({
    name: 'TermsConditions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(TermsConditions.pending, (state) => {
            state.loading = true;
            state.isSuccess = false
        }),
            builder.addCase(TermsConditions.fulfilled, (state, action) => {
                state.error = false;
                state.success = true;
                state.loading = false;
                state.isSuccess = true;
                state.TermsConditionsData = action.payload;
            }),
            builder.addCase(TermsConditions.rejected, (state) => {
                state.error = true;
                state.success = false;
                state.loading = false;
                state.TermsConditionsData = []
            })
    }
})
export default TermsConditionsSlice.reducer