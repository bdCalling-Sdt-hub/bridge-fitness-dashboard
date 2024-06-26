import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const AddPrivecy = createAsyncThunk(
  "AddPrivecy",
  async (value, thunkAPI) => {
    try {
      let response = await baseAxios.post("/manage/add-privacy-policy",value, {
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

export const AddPrivecySlice = createSlice({
  name: "AddPrivecy",
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
    builder.addCase(AddPrivecy.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(AddPrivecy.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(AddPrivecy.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = AddPrivecySlice.actions;

export default AddPrivecySlice.reducer;
