import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userData: [],
};

export const AddDiscount = createAsyncThunk(
  "AddDiscount",
  async (AddDiscountData, thunkAPI) => {
    try {
      let response = await baseAxios.post("/discount/add ", AddDiscountData, {
        headers: {
          "Content-type": "multipart/form-data",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response)
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

export const AddDiscountSlice = createSlice({
  name: "AddDiscount",
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
    builder.addCase(AddDiscount.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(AddDiscount.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = payload.message;
      state.userData.push(payload.data);
    });
    builder.addCase(AddDiscount.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.message = payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = AddDiscountSlice.actions;

export default AddDiscountSlice.reducer;
