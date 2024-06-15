import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    BannerData :[],
    meta : {}
};
export const GetBannerData = createAsyncThunk( 
    "GetBannerData",
    async (value, thunkAPI) => {
        try {
            let response = await baseAxios.get(`/banner`, {
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

export const GetBannerDataSlice = createSlice({
    name: "GetBannerData",
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
        builder.addCase(GetBannerData.pending, (state, { payload }) => {
            state.isLoading = true;

        })
        builder.addCase(GetBannerData.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
            state.BannerData = payload
            state.meta = payload.meta
        })
        builder.addCase(GetBannerData.rejected, (state, { payload }) => {

            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message
            state.BannerData = []
        })
    },

});

export const { reset } = GetBannerDataSlice.actions;

export default GetBannerDataSlice.reducer;