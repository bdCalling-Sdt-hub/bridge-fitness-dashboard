import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userData: [],
};

export const UpdateSeries = createAsyncThunk(
  "UpdateSeries",
  async (value, thunkAPI) => {
    const { id, data } = value;
    try {
      let token = localStorage.getItem("token");
      let response = await baseAxios.patch(`/series/edit/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

export const UpdateSerieSlice = createSlice({
  name: "updateSeries",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(UpdateSeries.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(UpdateSeries.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = payload.message;
      state.userData = payload.data;
    });
    builder.addCase(UpdateSeries.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.message = payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = UpdateSerieSlice.actions;

export default UpdateSerieSlice.reducer;
