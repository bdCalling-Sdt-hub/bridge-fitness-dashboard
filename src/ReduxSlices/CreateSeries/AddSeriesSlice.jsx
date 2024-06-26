import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userData: [],
};

export const AddSeries = createAsyncThunk(
  "AddSeries",
  async (addProgramData, thunkAPI) => {
    try {
      let response = await baseAxios.post(
        "/series/add",
        { ...addProgramData },
        {
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

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

export const AddSeriesSlice = createSlice({
  name: "addSeries",
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
    builder.addCase(AddSeries.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(AddSeries.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = payload.message;
      state.userData.push(payload.data);
    });
    builder.addCase(AddSeries.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.message = payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = AddSeriesSlice.actions;

export default AddSeriesSlice.reducer;
