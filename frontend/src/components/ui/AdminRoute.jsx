import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoute() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>{userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/" />}</div>
  );
}

export default AdminRoute;
