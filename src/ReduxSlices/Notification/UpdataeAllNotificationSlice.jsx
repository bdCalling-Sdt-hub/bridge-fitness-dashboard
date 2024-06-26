import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};


export const UpdataeAllNotification = createAsyncThunk(
    "UpdataeAllNotification",
    async (value, thunkAPI) => {
        try {
            let response = await baseAxios.patch(`/notification/update-notification`, {},{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return response.data;
        } catch (error) {
            const message = error?.response?.data?.message
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const UpdataeAllNotificationSlice = createSlice({
    name: "UpdataeAllNotification",
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
        builder.addCase(UpdataeAllNotification.pending, (state, { payload }) => {
            state.isLoading = true;

        })
        builder.addCase(UpdataeAllNotification.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
        })
        builder.addCase(UpdataeAllNotification.rejected, (state, { payload }) => {

            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message

        })
    },

});

export const { reset } = UpdataeAllNotificationSlice.actions;

export default UpdataeAllNotificationSlice.reducer;