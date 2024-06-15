import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userData: [],
};

export const UpdateBanner = createAsyncThunk(
  "UpdateBanner",
  async (value, thunkAPI) => {
    const { id, data } = value;
    console.log(`/program/${id}`);
    try {
      let response = await baseAxios.patch(`/program/edit/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const UpdateBannerSlice = createSlice({
  name: "updateBanner",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(UpdateBanner.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(UpdateBanner.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = payload.message;
      state.userData = payload.data;
    });
    builder.addCase(UpdateBanner.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.message = payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = UpdateBannerSlice.actions;

export default UpdateBannerSlice.reducer;
