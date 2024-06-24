
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading: userloading } = useSelector(state => state.Profile)
  const location =useLocation()
  if (userloading) {
    return <p>Loading...</p>
  } 
  if (location.pathname=='/make-admin' && user?.role != "SUPER_ADMIN" ) {
    return <Navigate to="/" />
  }
  if (user?.role == "ADMIN" || user?.role == "SUPER_ADMIN") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;



// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const location = useLocation();
//   const UserData = JSON.parse(localStorage.getItem("yourInfo"));

//   if (
    
//     UserData?.role == "ADMIN" || UserData?.role == "SUPER_ADMIN" 
//   ) {
//     return children;
//   } else {
//     return <Navigate to="/login" />;
//   }
// };

// export default PrivateRoute;
