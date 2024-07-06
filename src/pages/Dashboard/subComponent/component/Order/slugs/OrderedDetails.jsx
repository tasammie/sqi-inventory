import { Link, useParams } from "react-router-dom";
// import { useGetOrders } from "./Order/hooks/useGetOrders"

const OrderedDetails = () => {
  // const {id} = useParams();
  // const {orders, updateOrder, error, isLoading }= useGetOrders();
  


  return (
  
 <div>
       <Link to={`/dashboard/Orders`}>
      <span className="hover:underline px-3.5 py-2 rounded-xl shadow-md ">Back</span>
    </Link>
  
 </div>
  )
}

export default OrderedDetails
