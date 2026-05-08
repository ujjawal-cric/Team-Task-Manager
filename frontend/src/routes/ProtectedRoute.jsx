import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({
  children,
}) => {
  const { user, loading } =
    useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }

  return user ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;