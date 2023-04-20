import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, redirectedPath = "/login", children }) {
  if (!isLoggedIn) {
    return <Navigate to={redirectedPath} replace />;
  }

  return children;
}

export default ProtectedRoute;
