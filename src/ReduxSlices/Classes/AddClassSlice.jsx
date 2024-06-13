import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const AddClass = createAsyncThunk(
    "AddClass",
    async (value, thunkAPI) => {
        try {
            let response = await baseAxios.post("/class/add-class", value, {
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

export const AddClassSlice = createSlice({
    name: "AddClass",
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
        builder.addCase(AddClass.pending, (state, { payload }) => {
            state.isLoading = true;
        });
        builder.addCase(AddClass.fulfilled, (state, { payload }) => {
            console.log(payload);
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
        });
        builder.addCase(AddClass.rejected, (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message;
        });
    },
});

// Action creators are generated for each case reducer function
export const { reset } = AddClassSlice.actions;

export default AddClassSlice.reducer;
