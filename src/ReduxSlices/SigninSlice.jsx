import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userData: {},
  accessToken: "",
};

export const UserData = createAsyncThunk(
  "UserData",
  async (value, thunkAPI) => {
    try {
      const response = await baseAxios.post("/auth/login", value);
      localStorage.setItem("token", response?.data.data.accessToken);
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

export const signinSlice = createSlice({
  name: "signin",
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
    builder.addCase(UserData.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(UserData.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = payload.message;
      state.userData = payload.data;
      state.accessToken = payload.data.accessToken;
    });
    builder.addCase(UserData.rejected, (state, { payload }) => {
      state.isSuccess = payload.success;
      state.isError = true;
      state.isLoading = false;
      state.message = payload.message;
    });
  },

  // extraReducers: {
  //   [UserData.pending]: (state, action) => {
  //     state.isLoading = true;
  //   },
  //   [UserData.fulfilled]: (state, action) => {
  //     state.isError = false;
  //     state.isSuccess = true;
  //     state.isLoading = false;
  //     state.message = action.payload.message;
  //     state.userData = action.payload.user;
  //     state.accessToken = action.payload.accessToken;
  //   },
  //   [UserData.rejected]: (state, action) => {
  //     state.isError = true;
  //     state.isSuccess = false;
  //     state.isLoading = false;
  //     state.message = action.payload;
  //   },
  // },
});

// Action creators are generated for each case reducer function
export const { reset } = signinSlice.actions;

export default signinSlice.reducer;
