import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext/hooks/useAuth";
import { ROUTE_PATHS } from "../constants/routes";

export const PublicRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Cargando...</div>;

  return isAuthenticated ? (
    <Navigate
      to={ROUTE_PATHS.APPOINTMENTS}
      state={{ from: location }}
      replace
    />
  ) : (
    <Outlet />
  );
};
