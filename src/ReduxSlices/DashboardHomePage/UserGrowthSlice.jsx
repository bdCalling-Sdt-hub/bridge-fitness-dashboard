import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userData: [],
};

export const UserGrowth = createAsyncThunk(
  "UserGrowth",
  async (value, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      let response = await axios.get("/dashboard/user-growth", {
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

export const UserGrowthSlice = createSlice({
  name: "userGrowth",
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
    builder.addCase(UserGrowth.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(UserGrowth.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = payload.message;
      state.userData = payload.data;
    });
    builder.addCase(UserGrowth.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.message = payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = UserGrowthSlice.actions;

export default UserGrowthSlice.reducer;
