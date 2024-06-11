import { configureStore } from "@reduxjs/toolkit";
import SigninReducer from "./ReduxSlices/SigninSlice";
import AllUsersReducer from "./ReduxSlices/AllUsersSlice";
import AddProductSlice from "./ReduxSlices/Products/AddProductSlice";
import GetProductsSlice from "./ReduxSlices/Products/GetProductsSlice";
import DeleteProductSlice from "./ReduxSlices/Products/DeleteProductSlice";
import UpdateProductSlice from "./ReduxSlices/Products/UpdateProductSlice";
import SubscribersReducer from "./ReduxSlices/SubscribersSlice";
import AllProductsReducer from "./ReduxSlices/AllProductSlice";
import AddAdminReducer from "./ReduxSlices/MakeAdminSlice/AddAdminSlice";
import AddProductReducer from "./ReduxSlices/ManageProductSlice";
import SubscriptionReducer from "./ReduxSlices/AddSubscription";
import IncomesReducer from "./ReduxSlices/Income/IncomesSlice";
import IncomeGrowthReducer from "./ReduxSlices/Income/IncomeGrowthSlice";
import NewSubscriberReducer from "./ReduxSlices/DashboardHomePage/HomeSlice";
import SubscriptionGrowthReducer from "./ReduxSlices/DashboardHomePage/SubscriptionGrowthSlice";
import UserGrowthReducer from "./ReduxSlices/DashboardHomePage/UserGrowthSlice";
import DeleteAdminReducer from "./ReduxSlices/MakeAdminSlice/DeleteAdminSlice";
import AllAdminsReducer from "./ReduxSlices/MakeAdminSlice/GetAdminSlice";
import GetAllBlogSlice from "./ReduxSlices/Blog/GetAllBlogSlice";
import AddBlogSlice from "./ReduxSlices/Blog/AddBlogSlice";
import UpdateBlogSlice from "./ReduxSlices/Blog/UpdateBlogSlice";
import DeleteBlogSlice from "./ReduxSlices/Blog/DeleteBlogSlice";
import AddTermsSlice from "./ReduxSlices/Terms/AddTermsSlice";
import AddPrivecySlice from "./ReduxSlices/Privecy/AddPrivecySlice";
import AddAboutSlice from "./ReduxSlices/About/AddAboutSlice";
export const Store = configureStore({
  reducer: {
    UserData: SigninReducer,
    AllUsers: AllUsersReducer,
    AddProducts: AddProductSlice,
    GetProducts: GetProductsSlice,
    DeleteProducts: DeleteProductSlice,
    UpdateProduct: UpdateProductSlice,
    SubscriberUser: SubscribersReducer,
    AllProducts: AllProductsReducer,
    AddAdmin: AddAdminReducer,
    ManageProduct: AddProductReducer,
    Subscription: SubscriptionReducer,
    TotalIncome: IncomesReducer,
    IncomeGrowth: IncomeGrowthReducer,
    NewSubscriber: NewSubscriberReducer,
    SubscriptionGrowth: SubscriptionGrowthReducer,
    UserGrowth: UserGrowthReducer,
    DeleteAdmin: DeleteAdminReducer,
    AllAdmin: AllAdminsReducer,
    GetAllBlog :GetAllBlogSlice,
    AddBlog :AddBlogSlice,
    UpdateBlog : UpdateBlogSlice,
    DeleteBlog:DeleteBlogSlice,
    AddTerms :AddTermsSlice,
    AddPrivecy:AddPrivecySlice,
    AddAbout :AddAboutSlice,
  },
});
