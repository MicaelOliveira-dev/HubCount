import React from "react";
import { Navigate, Outlet } from "react-router-dom"

interface PrivateRouteProps {
  isAccessible: boolean;
  children: React.ReactNode;
  redirectPath: string;
}

const ProtectedRoute = ({
  isAccessible,
  redirectPath = '/login',
  children,
}: PrivateRouteProps) => {
  if (!isAccessible) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;