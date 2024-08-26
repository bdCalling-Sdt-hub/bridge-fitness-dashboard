import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userData: [],
};

export const AddCategory = createAsyncThunk(
  "AddCategory",
  async (AddCategoryData, thunkAPI) => {
    try {
      let response = await baseAxios.post("/series/catagory", AddCategoryData, {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
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

export const AddCategorySlice = createSlice({
  name: "AddCategory",
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
    builder.addCase(AddCategory.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(AddCategory.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = payload.message;
      state.userData.push(payload.data);
    });
    builder.addCase(AddCategory.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.message = payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = AddCategorySlice.actions;

export default AddCategorySlice.reducer;
