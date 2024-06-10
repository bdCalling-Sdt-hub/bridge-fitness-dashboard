import { configureStore } from "@reduxjs/toolkit";
import SigninReducer from "./ReduxSlices/SigninSlice";
import AllUsersReducer from "./ReduxSlices/AllUsersSlice";
import AddProductSlice from "./ReduxSlices/Products/AddProductSlice";
import GetProductsSlice from "./ReduxSlices/Products/GetProductsSlice";
import DeleteProductSlice from "./ReduxSlices/Products/DeleteProductSlice";
import UpdateProductSlice from "./ReduxSlices/Products/UpdateProductSlice";
export const Store = configureStore({
    reducer: {
        UserData: SigninReducer,
        AllUsers:AllUsersReducer,
        AddProducts : AddProductSlice,
        GetProducts:GetProductsSlice,
        DeleteProducts : DeleteProductSlice,
        UpdateProduct:UpdateProductSlice,
    }
});