import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userData: [],
};

export const ManageProduct = createAsyncThunk(
  "ManageProduct",
  async (addProductData, thunkAPI) => {
    try {
      const response = await baseAxios.post(
        "/product/add-product",
        addProductData,
        {
          headers: {
            "Content-type": "multipart/form-data",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ManageProductSlice = createSlice({
  name: " manageProduct",
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
    builder.addCase(ManageProduct.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(ManageProduct.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = payload.message;
      state.userData.push(payload.data);
    });
    builder.addCase(ManageProduct.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.message = payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = ManageProductSlice.actions;

export default ManageProductSlice.reducer;
