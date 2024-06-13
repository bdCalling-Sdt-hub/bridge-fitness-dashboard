import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};


export const UpdateClass = createAsyncThunk(
    "UpdateClass",
    async (value, thunkAPI) => {
        const {id, data}= value;
        try {
            // console.log(`/product/edit/${value.id}`)
            let response = await baseAxios.patch(`/class/edit/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(response.data)

            return response.data;
        } catch (error) {
            console.log(error)
            const message = error?.response?.data?.message
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const UpdateClassSlice = createSlice({
    name: "UpdateClass",
    initialState,

    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
            state.accessToken = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(UpdateClass.pending, (state, { payload }) => {
            state.isLoading = true;

        })
        builder.addCase(UpdateClass.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
            // console.log(payload)
        })
        builder.addCase(UpdateClass.rejected, (state, { payload }) => {

            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message

        })
    },

});

export const { reset } = UpdateClassSlice.actions;

export default UpdateClassSlice.reducer;