import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  add_banner: [],
};

export const AddBanner = createAsyncThunk(
  "AddBanner",
  async (AddBannerData, thunkAPI) => {
    try {
      console.log(AddBannerData.get("image"));
      let response = await baseAxios.post("/program/add", AddBannerData, {
        headers: {
          "Content-type": "multipart/form-data",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

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

export const AddBannerSlice = createSlice({
  name: "addBanner",
  initialState,

  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.add_banner = [];
      state.accessToken = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(AddBanner.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(AddBanner.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = payload.message;
      state.add_banner.push(payload.data);
    });
    builder.addCase(AddBanner.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.message = payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = AddBannerSlice.actions;

export default AddBannerSlice.reducer;
