import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuotePage from "../pages/Quote/QuotePage.tsx";
import GenerateQuote from "../pages/Quote/GenerateQuote.tsx";
import UpdateQuote from "../pages/Quote/UpdateQuote.tsx";
// import ClientsPage from "../pages/ClientsPage";
// import UpdateClient from "../pages/UpdateClient";
// import ServicePage from "../pages/ServicePage";
// import DesignPage from "../pages/DesignPage";
// import AddService from "../pages/AddServices";

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
  // {
  //   path: "/Clients",
  //   element: <ClientsPage />,
  // },
  // {
  //   path: "/Clients/UpdateClient/:data",
  //   element: <UpdateClient />,
  // },
  // {
  //   path: "/Services",
  //   element: <ServicePage />,
  // },
  // {
  //   path: "/Designs",
  //   element: <DesignPage />,
  // },
  // {
  //   path: "/Services/AddServices",
  //   element: <AddService />,
  // },
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
