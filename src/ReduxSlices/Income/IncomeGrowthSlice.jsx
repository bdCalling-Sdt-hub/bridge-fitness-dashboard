import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userData: [],
};

export const IncomeGrowth = createAsyncThunk(
  "IncomeGrowth",
  async (value, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      let response = await axios.get("/dashboard/income-growth", {
        headers: {
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

export const incomeGrowthSlice = createSlice({
  name: "incomeGrowth",
  initialState,

  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.userData = [];
      state.accessToken = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(IncomeGrowth.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(IncomeGrowth.fulfilled, (state, { payload }) => {

      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = payload.message;
      state.userData = payload.data;
    });
    builder.addCase(IncomeGrowth.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.message = payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = incomeGrowthSlice.actions;

export default incomeGrowthSlice.reducer;
