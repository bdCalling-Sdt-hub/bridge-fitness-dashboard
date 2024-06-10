import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userData: [],
  meta : {}

};


export const AllUsers = createAsyncThunk(
  "AllUsers",
  async (value, thunkAPI) => {
    try {
      let response = await axios.get("/auth/admin/users", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log(response.data)

      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const allUsersSlice = createSlice({
  name: "alluser",
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
    builder.addCase(AllUsers.pending, (state, { payload }) => {
      state.isLoading = true;

    })
    builder.addCase(AllUsers.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = payload.message;
      state.userData = payload.data;
      state.meta = payload.meta
      // console.log(payload)
    })
    builder.addCase(AllUsers.rejected, (state, { payload }) => {

      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.message = payload.message

    })
  },

});

export const { reset } = allUsersSlice.actions;

export default allUsersSlice.reducer;