import { configureStore } from "@reduxjs/toolkit";
import SigninReducer from "./ReduxSlices/SigninSlice";
import AllUsersReducer from "./ReduxSlices/AllUsersSlice";
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
export const Store = configureStore({
  reducer: {
    UserData: SigninReducer,
    AllUsers: AllUsersReducer,
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
  },
});
