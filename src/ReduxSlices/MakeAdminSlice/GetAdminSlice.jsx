import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userData: [],
};

export const AllAdmins = createAsyncThunk(
  "AllAdmins",
  async (value, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      let response = await baseAxios.get("/auth/admin/admins", {
        headers: {
          "Content-Type": "application/json",
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

export const allAdminsSlice = createSlice({
  name: "alladmins",
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
    builder.addCase(AllAdmins.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(AllAdmins.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = payload.message;
      state.userData = payload.data;
    });
    builder.addCase(AllAdmins.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.message = payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = allAdminsSlice.actions;

export default allAdminsSlice.reducer;
