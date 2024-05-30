import Login from "@/pages/authentication/login";
import SignUp from "@/pages/authentication/signup";
import { createBrowserRouter } from "react-router-dom";
// import DashboardRoute from "./DashboardRoute";
import Inventory from "@/pages/Dashboard/subComponent/component/Inventory";
import Supplier from "@/pages/Dashboard/subComponent/component/Supplier";
import Orders from "@/pages/Dashboard/subComponent/component/Orders";
import Customers from "@/pages/Dashboard/subComponent/component/Customers";
import Dashboard from "@/pages/Dashboard";
import DashboardRoute from "./DashboardRoute";



export const route = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/Dashboard",
    element: <DashboardRoute />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'inventory',
        element: <Inventory />
      },
      {
        path: 'orders',
        element: <Orders />
      }
    ],
  },
]);

export default route;
