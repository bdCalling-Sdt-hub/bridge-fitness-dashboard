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
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const UserData = JSON.parse(localStorage.getItem("yourInfo"));

  if (
    
    UserData?.role == "ADMIN"
  ) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
