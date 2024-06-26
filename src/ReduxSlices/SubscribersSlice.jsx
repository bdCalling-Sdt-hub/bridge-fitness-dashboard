import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userData: {},
};

export const Subscribers = createAsyncThunk(
  "Subscribers",
  async (value, thunkAPI) => {
    try {
      const response = await axios.get(
        `subscriptions/subscribers?page=${value.page}${value?.plan_type && value?.plan_type !='All'  && `&plan_type=${value?.plan_type}`}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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

export const subscribersSlice = createSlice({
  name: "subscribersUser",
  initialState,

  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.userData = {};
      state.accessToken = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(Subscribers.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(Subscribers.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = payload.message;
      state.userData = payload.data;
    });
    builder.addCase(Subscribers.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.message = payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = subscribersSlice.actions;

export default subscribersSlice.reducer;
