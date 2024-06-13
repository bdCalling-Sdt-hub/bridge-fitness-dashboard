import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  allNotification: [],
};

export const AllNotification = createAsyncThunk(
  "AllNotification",
  async (value, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      let response = await baseAxios.get(
        "/notification/get-all-notifications",
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

export const GetAllNotificationSlice = createSlice({
  name: "getAllSubscription",
  initialState,

  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.allNotification = [];
      state.accessToken = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(AllNotification.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(AllNotification.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = payload.message;
      state.allNotification = payload.data;
    });
    builder.addCase(AllNotification.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.message = payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = GetAllNotificationSlice.actions;

export default GetAllNotificationSlice.reducer;
