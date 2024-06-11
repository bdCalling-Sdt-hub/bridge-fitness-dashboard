// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const location = useLocation();

//   const user = {
//     email: "tushar@gmail.com",
//   };

//   if (user.email) {
//     return children;
//   }

//   return <Navigate to="/login" state={{ from: location }} />;
// };

// export default PrivateRoute;

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userData = useSelector((state) => state.UserData);
  console.log(userData);
  // const location = useLocation();
  // const UserData = JSON.parse(localStorage.getItem("yourInfo"));
  // console.log(UserData);
  // if (UserData?.role == "ADMIN") {
  //   return children;
  // } else {
  //   return <Navigate to="/login" />;
  // }
  return children;
};

export default PrivateRoute;
