import Login from "@/pages/authentication/login";
import SignUp from "@/pages/authentication/signup";
import { createBrowserRouter } from "react-router-dom";
import DashboardRoute from "./DashboardRoute";
import Dashboard from "@/pages/Dashboard/subComponent/component/Dashboard/component";
import MainInventory from "./MainInventoryRoute";
import Inventory from "@/pages/Dashboard/subComponent/component/Inventory/componenet/Inventory";
import ProductDetails from "@/pages/Dashboard/subComponent/component/Inventory/slugs/ProductDetails";
import OrderRoute from "./OrderRoute";
import OrdersPage from "@/pages/Dashboard/subComponent/component/Order/component/Orders";
import OrderedDetails from "@/pages/Dashboard/subComponent/component/Order/slugs/OrderedDetails";
import Sales from "@/pages/Dashboard/subComponent/component/Sales/component/Sales";
import Supplier from "@/pages/Dashboard/subComponent/component/Supplier/component/Supplier";
import LogsActivities from "@/pages/Dashboard/subComponent/component/Log/component/LogActivities";



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
        // element: <h1>hhhhhhhhhhhhhhhh</h1>
      },
      {
        path: 'inventory',
        element: <MainInventory/>,
        children: [
          {
            index: true,
            element: <Inventory/>,
          },
          {
            path: ':id',
            element: <ProductDetails/>,
            // element: <h1>hello</h1>
          }
          
        ]

      },
      {
        path: 'orders',
        element: <OrderRoute />, 
        children:[
          {
            index: true,
            element: <OrdersPage />, 

          },
          {
            path: ':id',
            element: <OrderedDetails/>, 

          }
        ]
      },
      {
        path: 'sales',
        element: <Sales/>
      },
      {
        path:'supplier',
        element: <Supplier />
      },
  
      {
        path: "orders/:id",
        element: <OrderedDetails/>,
      },
      {
        path: 'logactivity',
        element: <LogsActivities/>
      }
   

    ],
  },
]);

export default route;
