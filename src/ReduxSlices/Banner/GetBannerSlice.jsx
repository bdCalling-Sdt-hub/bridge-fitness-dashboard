import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  allBanner: [],
};

export const AllBanner = createAsyncThunk(
  "GetBannerData",
  async (value, thunkApi) => {
    try {
      const response = await baseAxios.get(`/banner`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response?.data.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const GetBannerSlice = createSlice({
  name: "allBanners",
  initialState,

  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.get_banner = [];
      state.accessToken = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(AllBanner.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(AllBanner.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = payload.message;
      state.get_banner = payload.data;
    });
    builder.addCase(AllBanner.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.message = payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = GetBannerSlice.actions;

export default GetBannerSlice.reducer;
