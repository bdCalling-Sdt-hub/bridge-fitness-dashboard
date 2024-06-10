import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userData: [],
};

export const AddAdmin = createAsyncThunk(
  "AddAdmin",
  async (addAdminData, thunkAPI) => {
    try {
      let response = await baseAxios.post(
        "/auth/admin/add-admin",
        { ...addAdminData },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);

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

export const AddAdminSlice = createSlice({
  name: "addadmin",
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
    builder.addCase(AddAdmin.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(AddAdmin.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = payload.message;
      state.userData.push(payload.data);
    });
    builder.addCase(AddAdmin.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.message = payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = AddAdminSlice.actions;

export default AddAdminSlice.reducer;
