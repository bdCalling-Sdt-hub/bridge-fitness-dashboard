import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  allEcommerce: [],
};

export const AllEcommerce = createAsyncThunk(
  "AllEcommerce",
  async (value, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      let response = await baseAxios.get(
        `/dashboard/ecommerce-income-details?page=${value.page}&searchTerm=${value.searchTerm}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

export const GetAllSubscriptionSlice = createSlice({
  name: "getAllSubscription",
  initialState,

  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.allEcommerce = [];
      state.accessToken = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(AllEcommerce.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(AllEcommerce.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = payload.message;
      state.allEcommerce = payload.data;
    });
    builder.addCase(AllEcommerce.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.message = payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = GetAllSubscriptionSlice.actions;

export default GetAllSubscriptionSlice.reducer;
