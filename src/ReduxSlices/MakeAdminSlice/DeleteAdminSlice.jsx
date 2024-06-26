import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";
const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userData: [],
};

export const DeleteAdmin = createAsyncThunk(
  "DeleteAdmin",
  async (value, thunkAPI) => {
    try {
      let response = await baseAxios.delete(`/auth/admin/delete/${value}`, {
        headers: {
          "Content-Type": "application/json",
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

export const DeleteAdminSlice = createSlice({
  name: "deleteAdmin",
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
    builder.addCase(DeleteAdmin.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteAdmin.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = payload.message;
      state.userData = payload.data;
    });
    builder.addCase(DeleteAdmin.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.message = payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = DeleteAdminSlice.actions;

export default DeleteAdminSlice.reducer;
