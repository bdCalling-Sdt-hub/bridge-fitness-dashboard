
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading: userloading } = useSelector(state => state.Profile)
  if (userloading) {
    return
  }
  if (user?.role == "ADMIN" || user?.role == "SUPER_ADMIN") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
