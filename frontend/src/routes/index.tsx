import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuotePage from "../pages/Quote/QuotePage.tsx";
import GenerateQuote from "../pages/Quote/generateQuote.tsx";
import UpdateQuote from "../pages/Quote/updateQuote.tsx";
import ClientsPage from "../pages/Client/clientsPage.tsx";
import UpdateClient from "../pages/Client/UpdateClient.tsx";
import ServicePage from "../pages/Service/servicePage.tsx";
import AddService from "../pages/Service/addServices.tsx";
import DesignPage from "../pages/Design/designPage.tsx";
import EditServices from "../pages/Service/updateService.tsx";
import UpdateDesigns from "../pages/Design/updateDesign.tsx";
import AddDesigns from "../pages/Design/addDesign.tsx";
import NotFound from "../pages/404.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuotePage />,
  },
  {
    path: "/GenerateQuote",
    element: <GenerateQuote />,
  },
  {
    path: "/UpdateQuote/:data",
    element: <UpdateQuote />,
  },
  {
    path: "/Clients",
    element: <ClientsPage />,
  },
  {
    path: "/Clients/UpdateClient/:data",
    element: <UpdateClient />,
  },
  {
    path: "/Services",
    element: <ServicePage />,
  },
  {
    path: "/Services/AddServices",
    element: <AddService />,
  },
  {
    path: "/Services/EditServices/:data",
    element: <EditServices />,
  },
  {
    path: "/Designs",
    element: <DesignPage />,
  },
  {
    path: "/Designs/AddDesigns",
    element: <AddDesigns />,
  },
  {
    path: "/Designs/EditDesigns/:data",
    element: <UpdateDesigns />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
