import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const AddSubscriptions = createAsyncThunk(
  "AddSubscriptions",
  async (value, thunkAPI) => {
    try {
        const {id,...otherValue}=value
      let response = await baseAxios.patch(`/subscription-plan/update-item/${id}`,otherValue, {
        headers: {
          'Content-Type': 'application/json',
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

export const AddSubscriptionsSlice = createSlice({
  name: "AddSubscriptions",
  initialState,

  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(AddSubscriptions.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(AddSubscriptions.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(AddSubscriptions.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = AddSubscriptionsSlice.actions;

export default AddSubscriptionsSlice.reducer;
