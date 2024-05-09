import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hook/auth/Auth";
import { useEffect } from "react";

export default function RequireAuth({ children }) {
  const {
    authState: { isAuthenticated },
  } = useAuth();
  const location = useLocation();

  console.log("auth===>", useAuth());

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
}
