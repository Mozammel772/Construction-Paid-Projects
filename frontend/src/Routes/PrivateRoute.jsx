import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAutoLogout from "../hooks/useAutoLogout";

const PrivateRoute = ({ children }) => {
  // useAutoLogout();

  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
