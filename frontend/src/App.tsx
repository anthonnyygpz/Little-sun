import { LoginPage } from "./pages/auth/LoginPage";
import { ROUTE_PATHS } from "./constants/routes";
import { NotFound } from "./pages/404Page";
import { PrivateRoute } from "./routes/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { AppointmentPage } from "./pages/appointments/ViewAppointment";
import { CreateAppointmentPage } from "./pages/appointments/CreateAppointment";
import { PublicRoute } from "./routes/PublicRoute";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ViewClient } from "./pages/clients/ViewClient";
import { ViewNailService } from "./pages/nailService/ViewNailService";
import { ViewNailDesign } from "./pages/nailDesign/ViewNailDesign";
import { CreateNailServicePage } from "./pages/nailService/CreateNailServicePage";
import { Toaster } from "react-hot-toast";
import { CreateNailDesignPage } from "./pages/nailDesign/CreateNailDesignPage";

export const App = () => {
  return (
    <ErrorBoundary fallback={<div>Error critico - Recargar la pagina</div>}>
      <Router>
        <Toaster />
        <AuthProvider>
          <Routes>
            {/* Rutas publicas */}
            <Route element={<PublicRoute />}>
              <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
              <Route path={ROUTE_PATHS.REGISTER} element={<RegisterPage />} />
            </Route>

            {/* Rutas privadas */}
            <Route element={<PrivateRoute />}>
              <Route
                path={ROUTE_PATHS.APPOINTMENTS}
                element={<AppointmentPage />}
              />
              <Route
                path={ROUTE_PATHS.CREATE_APPOINTMENT}
                element={<CreateAppointmentPage />}
              />
              <Route path={ROUTE_PATHS.CLIENT} element={<ViewClient />} />
              <Route
                path={ROUTE_PATHS.NAIL_SERVICE}
                element={<ViewNailService />}
              />
              <Route path={ROUTE_PATHS.CLIENT} element={<ViewClient />} />
              <Route
                path={ROUTE_PATHS.NAIL_DESIGN}
                element={<ViewNailDesign />}
              />
              <Route
                path={ROUTE_PATHS.CREATE_NAIL_SERVICE}
                element={<CreateNailServicePage />}
              />
              <Route
                path={ROUTE_PATHS.CREATE_NAIL_DESIGN}
                element={<CreateNailDesignPage />}
              />
            </Route>

            {/* 404 */}
            <Route path={ROUTE_PATHS.NOT_FOUND} element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
};
