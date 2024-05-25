import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hook/auth/Auth';

const RequireAuth = ({ children }) => {
  const {
    authState: { user },
  } = useAuth();
  const location = useLocation();
  console.log('auth==>', user);
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
};

export default RequireAuth;
