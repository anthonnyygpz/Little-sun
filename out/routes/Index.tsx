import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuotePage from "../pages/QuotePage";
import GenerateQuotePage from "../pages/GenerateQuote";

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuotePage />,
  },
  {
    path: "/GenerateQuote",
    element: <GenerateQuotePage />,
  },
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
