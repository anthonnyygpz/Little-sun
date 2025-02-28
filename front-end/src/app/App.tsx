import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "../features/shared/pages/404";
import {
  ViewAppointment,
  UpdateAppointment,
  GenerateAppointment,
} from "../features/appointment";
import { ViewClient, UpdateClient } from "../features/client/";
import { AddService, ViewService, UpdateService } from "../features/service";
import { AddDesign, ViewDesign, UpdateDesign } from "../features/design";
// import EditServices from "../pages/Service/updateService.tsx";
// import UpdateDesigns from "../pages/Design/updateDesign.tsx";
// import AddDesigns from "../pages/Design/addDesign.tsx";
// import NotFound from "../pages/404.tsx";
// import LoginPage from "../pages/Login/loginPage.tsx";

const router = createBrowserRouter([
  {
    path: "/GenerateQuote",
    element: <GenerateAppointment />,
  },
  {
    path: "/",
    element: <ViewAppointment />,
  },
  {
    path: "/UpdateQuote/:data",
    element: <UpdateAppointment />,
  },
  {
    path: "/Clients",
    element: <ViewClient />,
  },
  {
    path: "/Clients/UpdateClient/:data",
    element: <UpdateClient />,
  },
  {
    path: "/Services/AddServices",
    element: <AddService />,
  },
  {
    path: "/Services",
    element: <ViewService />,
  },
  {
    path: "/Services/EditServices/:data",
    element: <UpdateService />,
  },
  {
    path: "/Designs/AddDesigns",
    element: <AddDesign />,
  },
  {
    path: "/Designs",
    element: <ViewDesign />,
  },
  {
    path: "/Designs/EditDesigns/:data",
    element: <UpdateDesign />,
  },
  // {
  //   path: "/Login",
  //   element: <LoginPage />,
  // },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
