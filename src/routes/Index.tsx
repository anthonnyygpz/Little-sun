import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuotePage from "../pages/QuotePage";
import GenerateQuotePage from "../pages/GenerateQuote";
import UpdateQuote from "../pages/UpdateQuote";
import ClientsPage from "../pages/ClientsPage";
import UpdateClient from "../pages/UpdateClient";

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuotePage />,
  },
  {
    path: "/GenerateQuote",
    element: <GenerateQuotePage />,
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
    element: <UpdateClient />
  }
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
