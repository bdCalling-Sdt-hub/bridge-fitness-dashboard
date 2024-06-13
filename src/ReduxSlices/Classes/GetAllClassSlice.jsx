import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../../Config";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    Classes :[],
    meta : {}
};


export const GetAllClass = createAsyncThunk(
    "GetAllClass",
    async (value, thunkAPI) => {//${value?.searchTerm && `${value.date?'&':'?'}searchTerm=${value?.searchTerm}
        try {
            let response = await baseAxios.get(`/class/all?page=${value.page}&limit=${value.limit}${value?.searchTerm && `&searchTerm=${value?.searchTerm}`}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            // console.log(response)
            return response.data.data;
        } catch (error) {
            const message = error?.response?.data?.message
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const GetAllClassSlice = createSlice({
    name: "GetAllClass",
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
        builder.addCase(GetAllClass.pending, (state, { payload }) => {
            state.isLoading = true;

        })
        builder.addCase(GetAllClass.fulfilled, (state, { payload }) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = payload.message;
            state.Classes = payload.data
            state.meta = payload.meta
            // console.log(payload)
        })
        builder.addCase(GetAllClass.rejected, (state, { payload }) => {

            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = payload.message
            state.Classes = []
            state.meta = {}

        })
    },

});

export const { reset } = GetAllClassSlice.actions;

export default GetAllClassSlice.reducer;