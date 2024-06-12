import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userData: [],
};

export const Subscription = createAsyncThunk(
  "Subscription",
  async (value, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      let response = await axios.get("/subscription-plan/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

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

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,

  reducers: {
  
  },

  extraReducers: (builder) => {
    builder.addCase(Subscription.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(Subscription.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = payload.message;
      state.userData = payload.data;
    });
    builder.addCase(Subscription.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.message = payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
