import { Navigate } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";
import React from "react";
import Login from "../Components/Login";
import { useEffect } from "react";

function PrivateRoute({ children }) {
  const UserToken = localStorage.getItem("UserToken");
  const isAuthenticated =
    UserToken !== "undefined" && UserToken !== null ? true : false;
  return isAuthenticated ? (
    <Dashboard children={children} />
  ) : (
    <Navigate to="/" />
  );
}

export default PrivateRoute;
