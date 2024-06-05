import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    userData:[],
    
  };


  export const AllUsers = createAsyncThunk(
    "AllUsers",
    async (value, thunkAPI) => {
      try {
        console.log("tushar",value)
        let token=localStorage.getItem("token")
        let response = await axios.get("/auth/admin/users",{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
        console.log(response.data)
       // console.log(response.data);
  
        return response.data;
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data) ||
          error.message ||
          error.toString();
  
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  export const allUsersSlice = createSlice({
    name: "alluser",
    initialState,
  
    reducers: {
      reset: (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.userData = {};
        state.accessToken = "";
      },
    },


    extraReducers: (builder) => {
        builder.addCase(AllUsers.pending, (state, { payload }) => {
            state.isLoading = true;
            
          })
        builder.addCase(AllUsers.fulfilled, (state, { payload }) => {
          console.log(payload)
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.message = payload.message;
                state.userData=payload.data;
               
                

          
        })
        builder.addCase(AllUsers.rejected, (state,{payload}) => {
          
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message=payload.message
           
        })
      },
  
    // extraReducers: {
    //   [UserData.pending]: (state, action) => {
    //     state.isLoading = true;
    //   },
    //   [UserData.fulfilled]: (state, action) => {
    //     console.log(action)
    //     state.isError = false;
    //     state.isSuccess = true;
    //     state.isLoading = false;
    //     state.message = action.payload.message;
    //     state.userData = action.payload.user;
    //     state.accessToken = action.payload.accessToken;
    //   },
    //   [UserData.rejected]: (state, action) => {
    //     state.isError = true;
    //     state.isSuccess = false;
    //     state.isLoading = false;
    //     state.message = action.payload;
    //   },
    // },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = allUsersSlice.actions;
  
  export default allUsersSlice.reducer;