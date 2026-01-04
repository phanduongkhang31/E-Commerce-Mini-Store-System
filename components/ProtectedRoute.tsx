import React from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "../App";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  requireUser?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = false,
  requireAdmin = false,
  requireUser = false,
}) => {
  const { user, isAuthenticated } = useApp();

  // If authentication is required but user is not logged in
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If admin access is required but user is not admin
  if (requireAdmin && (!user || user.role !== "admin")) {
    return <Navigate to="/" replace />;
  }

  // If user access is required but user is admin
  if (requireUser && user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

