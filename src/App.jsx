import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";
import Notification from "./Pages/Dashboard/Notification";
import Otp from "./Pages/Auth/Otp";
import Login from "./Pages/Auth/Login";
import UpdatePassword from "./Pages/Auth/UpdatePassword";
import NotFound from "./404";
import PrivateRoute from "./routes/PrivateRoute";
import EditPackage from "./Pages/Dashboard/EditPackage";
import MakeAdmin from "./Pages/Dashboard/MakeAdmin";
import ChangePassword from "./Pages/Dashboard/ChangePassword";
import Profile from "./Pages/Dashboard/Profile";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import SellerDetails from "./Pages/Dashboard/SellerDetails";
import SellerProductList from "./Pages/Dashboard/SellerProductList";
import TotalSellerList from "./Pages/Dashboard/TotalSellerList";
import ManageOrder from "./Pages/Dashboard/ManageOrder";
import AddSubscription from "./Pages/Dashboard/AddSubscription";
import Income from "./Pages/Dashboard/Income";
import ClassManagement from "./Pages/Dashboard/ClassManagement";
import ManageProducts from "./Pages/Dashboard/ManageProducts";
import About from "./Pages/Dashboard/About";
import Contact from "./Pages/Dashboard/Contact";
import FAQ from "./Pages/Dashboard/FAQ";
import PrivacyPolicy from "./Pages/Dashboard/PrivacyPolicy";
import Terms from "./Pages/Dashboard/Terms";
import Blog from "./Pages/Dashboard/Blog";
import AdminProfile from "./Pages/Dashboard/AdminProfile";
import AllSubscriber from "./Pages/Dashboard/AllSubscriber";
import SubscriptionIncome from "./Pages/Dashboard/SubscriptionIncome";
import EcommerceIncome from "./Pages/Dashboard/EcommerceIncome";
import CreateProgram from "./Pages/Dashboard/CreateProgram";
import Series from "./Pages/Dashboard/Series";
import AddBaner from "./Pages/Dashboard/AddBaner";
function App() {
  return (
    <>
      <div className="maincontainer noto">
        <Router>
          <Routes>
            <Route exact path="/" element={<PrivateRoute> <Dashboard /> </PrivateRoute>}>
              <Route path="/" element={<PrivateRoute><DashboardHome /></PrivateRoute>} />
              <Route path="/notification" element={<PrivateRoute><Notification /></PrivateRoute>} />
              <Route path="/edit-package" element={<PrivateRoute><EditPackage /></PrivateRoute>} />
              <Route path="/make-admin" element={<PrivateRoute><MakeAdmin /></PrivateRoute>} />
              <Route path="/setting-change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
              <Route path="/settings-profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/user-list" element={<PrivateRoute><TotalSellerList /></PrivateRoute>} />
              <Route path="/manage-order" element={<PrivateRoute><ManageOrder /></PrivateRoute>} />
              <Route path="/add-subscription" element={<PrivateRoute><AddSubscription /></PrivateRoute>} />
              <Route path="/income" element={<PrivateRoute><Income /></PrivateRoute>} />
              <Route path="/manage-products" element={<PrivateRoute><ManageProducts /></PrivateRoute>} />
              <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
              <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
              <Route path="/faq" element={<PrivateRoute><FAQ /></PrivateRoute>} />
              <Route path="/privacy" element={<PrivateRoute><PrivacyPolicy /></PrivateRoute>} />
              <Route path="/terms-condition" element={<PrivateRoute><Terms /></PrivateRoute>} />
              <Route path="/blog" element={<PrivateRoute><Blog /></PrivateRoute>} />
              <Route path="/series" element={<PrivateRoute><Series /></PrivateRoute>} />
              <Route path="/series/:name" element={<PrivateRoute><ClassManagement /></PrivateRoute>} />
              <Route path="/create-program" element={<PrivateRoute><CreateProgram /></PrivateRoute>} />
              <Route path="/ecommerce-income" element={<PrivateRoute><EcommerceIncome /></PrivateRoute>} />
              <Route path="/admin-profile" element={<PrivateRoute><AdminProfile /></PrivateRoute>} />
              <Route path="/all-subscriber" element={<PrivateRoute><AllSubscriber /></PrivateRoute>} />
              <Route path="/subscription-income" element={<PrivateRoute><SubscriptionIncome /></PrivateRoute>} />
              <Route path="/seller-details/:id" element={<PrivateRoute><SellerDetails /></PrivateRoute>} />
              <Route path="/seller-product-list" element={<PrivateRoute><SellerProductList /></PrivateRoute>} />
              <Route path="/banner" element={<PrivateRoute><AddBaner /></PrivateRoute>} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
