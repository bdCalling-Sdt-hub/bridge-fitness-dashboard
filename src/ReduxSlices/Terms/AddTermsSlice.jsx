import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const AddTerms = createAsyncThunk(
  "AddTerms",
  async (value, thunkAPI) => {
    try {
      let response = await baseAxios.post("/manage/add-terms-conditions",value, {
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

export const AddTermsSlice = createSlice({
  name: "AddTerms",
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
    builder.addCase(AddTerms.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(AddTerms.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(AddTerms.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = AddTermsSlice.actions;

export default AddTermsSlice.reducer;
