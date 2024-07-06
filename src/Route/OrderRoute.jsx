// import OrdersPage from "@/pages/Dashboard/subComponent/component/Orders"
import { Outlet } from "react-router-dom"


const OrderRoute = () => {
  return (
    <div>
      {/* <OrdersPage> */}
        <Outlet/>
      {/* </OrdersPage> */}
    </div>
  )
}

export default OrderRoute
