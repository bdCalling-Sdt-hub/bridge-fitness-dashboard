import { configureStore } from "@reduxjs/toolkit";
import SigninReducer from "./ReduxSlices/SigninSlice";
import AllUsersReducer from "./ReduxSlices/AllUsersSlice";
export const Store = configureStore({
    reducer: {
        UserData: SigninReducer,
        AllUsers:AllUsersReducer
    }
});