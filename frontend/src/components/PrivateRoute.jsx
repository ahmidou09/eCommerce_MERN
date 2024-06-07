import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute() {
  const { userInfo } = useSelector((state) => state.auth);
  return <div>{userInfo ? <Outlet /> : <Navigate to="/login" />}</div>;
}

export default PrivateRoute;
