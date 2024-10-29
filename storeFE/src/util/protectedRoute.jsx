import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/wrapContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { auth } = useContext(AuthContext);

  const isAuthenticated = auth.isAuthenticated;
  const userRole = auth.user?.role;

  console.log(userRole);
  // Kiểm tra nếu người dùng đã xác thực và có vai trò phù hợp
  const hasAccess = isAuthenticated && userRole === requiredRole;

  return hasAccess ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
