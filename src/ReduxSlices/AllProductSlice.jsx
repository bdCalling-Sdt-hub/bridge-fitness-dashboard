import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userData: [],
};

export const AllProducts = createAsyncThunk(
  "AllProducts",
  async (value, thunkAPI) => {
    try {
      console.log("tushar", value);
      let token = localStorage.getItem("token");
      let response = await axios.get("product/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data)

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

export const AllProductsSlice = createSlice({
  name: "allproducts",
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
    builder.addCase(AllProducts.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(AllProducts.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = payload.message;
      state.userData = payload.data;
    });
    builder.addCase(AllProducts.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.message = payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = AllProductsSlice.actions;

export default AllProductsSlice.reducer;
