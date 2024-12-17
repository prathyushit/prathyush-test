import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth_provider";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in", { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};
