import { Outlet, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext/hooks/useAuth";
import { Navigate } from "react-router";
import { ROUTE_PATHS } from "../constants/routes";

export const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Cargando...</div>;

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTE_PATHS.LOGIN} state={{ from: location }} replace />
  );
};
