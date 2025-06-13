import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";

const UserRoute = ({ children }) => {
  const { role, isLoading, error } = useRole();

  if (isLoading) return <p className="min-h-screen mx-auto justify-center items-center text-2xl font-semibold italic">Loading dashboard...</p>;

  if (role === "user") return children;

  return <Navigate to="/login" replace />;
};

export default UserRoute;
