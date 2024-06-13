import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Profile } from "../ReduxSlices/Profile/ProfileSlice";
export const AdminContext = createContext(null || {});
const AdminProvider = ({ children }) => {
  const dispatch = useDispatch()
  const {user,loading:userloading}=useSelector(state=>state.Profile)
    useEffect(() => {
        dispatch(Profile())
    }, [])
    const userData = {
      user,userloading
    }

  return (
    <AdminContext.Provider value={userData}>{children}</AdminContext.Provider>
  );
};

export default AdminProvider;
