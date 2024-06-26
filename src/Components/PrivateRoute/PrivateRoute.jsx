import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isLoading, isError, isSuccess, userData, accessToken, message } =
    useSelector((state) => state.yourInfo);
  // const location = useLocation();
  // const UserData = JSON.parse(localStorage.getItem("yourInfo"));
  // if (
  //   UserData?.approved != false &&
  //   UserData?.isBanned == "false" &&
  //   UserData?.emailVerified != false &&
  //   UserData?.role == "admin"
  // ) {
  //   return children;
  // } else {
  //   return <Navigate to="/login" />;
  // }
  return children;
};

export default PrivateRoute;
