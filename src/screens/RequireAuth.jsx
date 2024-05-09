import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hook/auth/Auth";

const RequireAuth = ({ children }) => {
  const {
    authState: { isAuthenticated },
  } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
};

export default RequireAuth;
