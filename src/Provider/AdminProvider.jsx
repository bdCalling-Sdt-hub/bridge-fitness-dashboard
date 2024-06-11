import { createContext, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Profile } from "../ReduxSlices/ProfileSlice";

export const AdminContext = createContext(null || {});
const AdminProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Profile);
  console.log(user);
  useEffect(() => {
    dispatch(Profile());
  }, []);
  const userData = {
    user,
  };
  return (
    <AdminContext.Provider value={userData}>{children}</AdminContext.Provider>
  );
};

export default AdminProvider;
