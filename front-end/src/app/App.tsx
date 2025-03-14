import { ReactNode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import NotFound from "../features/shared/pages/404";
import {
  ViewAppointment,
  UpdateAppointment,
  GenerateAppointment,
} from "../features/appointment";
import { ViewClient, UpdateClient } from "../features/client/";
import { AddService, ViewService, UpdateService } from "../features/service";
import { AddDesign, ViewDesign, UpdateDesign } from "../features/design";
import { Login } from "../features/auth/";
import { Register } from "../features/user/";
import { Navigate } from "react-router";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? <>{children}</> : <Navigate to={"/login"} />;
};

const router = createBrowserRouter([
  {
    path: "/GenerateQuote",
    element: (
      <ProtectedRoute>
        <GenerateAppointment />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <ViewAppointment />
      </ProtectedRoute>
    ),
  },
  {
    path: "/UpdateQuote/:data",
    element: (
      <ProtectedRoute>
        <UpdateAppointment />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Clients",
    element: (
      <ProtectedRoute>
        <ViewClient />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Clients/UpdateClient/:data",
    element: (
      <ProtectedRoute>
        <UpdateClient />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Services/AddServices",
    element: (
      <ProtectedRoute>
        <AddService />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Services",
    element: (
      <ProtectedRoute>
        <ViewService />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Services/EditServices/:data",
    element: (
      <ProtectedRoute>
        <UpdateService />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Designs/AddDesigns",
    element: (
      <ProtectedRoute>
        <AddDesign />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Designs",
    element: (
      <ProtectedRoute>
        <ViewDesign />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Designs/EditDesigns/:data",
    element: (
      <ProtectedRoute>
        <UpdateDesign />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
