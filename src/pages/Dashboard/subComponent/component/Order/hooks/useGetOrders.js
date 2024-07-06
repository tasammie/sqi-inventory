import { useToast } from "@/components/ui/use-toast";
import { publicRequest } from "@/shared/Api/request";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useGetOrders = () => {
  const [isLoading, setIsLoading] = useState();
  const [orders, setOrders] = useState();
  const [error, setError] = useState();
  const [totalOrders, setTotalOrders] = useState();
  const [totalOrdersLast7Days, setTotalOrdersLast7Days] = useState();
  const [totalRevenueLast7Days, setTotalRevenueLast7Days] = useState();
  const [pendingOrders, setPendingOrders] = useState(0);
  const [totalPendingCost, setTotalPendingCost] = useState()
  const [totalConfirmedOrders, setTotalConfirmedOrders] = useState(0)
  const [totalConfirmedRevenue, setTotalConfirmedRevenue] = useState(0)
  const [returnedOrdersLast7Days, setReturnedOrdersLast7Days] = useState()
  const [returnedRevenueLast7Days, setReturnedRevenueLast7Days] = useState()
  const { toast } = useToast();
  const navigation = useNavigate();

  const getAllOrders = async () => {
    try {
      setIsLoading(true);
      const res = await publicRequest.get("order/getorderlist");
      // console.log(res, "order");
      setOrders(res?.data?.Data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const createNewOrders = async (orderData) => {
    setIsLoading(true);
    try {
      const res = await publicRequest.post("order/orderlist", orderData);
      setOrders((prevOrders) => [...prevOrders, res?.data]);
      toast({
        title: "Success ✅✅",
        description: "Order created successfully",
      });
      getAllOrders()
    } catch (error) {
      setError(error);
      toast({
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // const updateOrder = async (id, orderData) => {
  //   setIsLoading(true);
  //   try {
  //     const res = await publicRequest.patch(
  //       `order/updateorderlist/${id}`,
  //       orderData
  //     );
  //     console.log(res, "update order");
  //     setOrders(res?.data);
  //     toast({
  //       title: "Success ✅✅",
  //       description: "Order updated successfully",
  //     });
  //   } catch (error) {
  //     setError(error);
  //     toast({
  //       title: "Error",
  //       description: error.message,
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const getSingleOrderById = async (id) =>{
    setIsLoading(true);
    try {
      const res = await publicRequest.get(`order/singleOrder/${id}`);
      console.log(res, "Order id");
      setOrders(res?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }

  const deleteOrder = async (id) => {
    setIsLoading(true);
    try {
      const res = await publicRequest.delete(`order/deleteorderlist/${id}`);
      setOrders(res?.data);
      toast({
        title: "Success ✅✅",
        description: "Order deleted successfully",
      });
      getAllOrders()
    } catch (error) {
      setError(error);
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalOrder = async () =>{
    setIsLoading(true);
    try {
      const res = await publicRequest.get("order/ordersInLast7Days");
      // console.log(res, "totalOrders");
      // setTotalOrders(res?.data?.totalOrders);
      setTotalOrders(res?.data?.totalOrdersLast7Days);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }

  // const getOrdersForLast7Days = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await publicRequest.get("/order/confirmedOrders");
  //     // console.log(res.data, "tot last 7");
  //     setTotalRevenueLast7Days(res?.data?.totalRevenueLast7Days);
  //     setTotalOrdersLast7Days(res?.data?.totalOrdersLast7Days);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     setError(error);
  //   }
  // }


  const getConfirmedOrdersLast7Days = async () =>{
    setIsLoading(true);
    try {
      const res = await publicRequest.get("order/confirmedOrders");
      // console.log(res, "Order confirmed");
      setTotalConfirmedOrders(res?.data?.confirmedOrdersLast7Days);
      setTotalConfirmedRevenue(res?.data?.confirmedRevenueLast7Days);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }

  const getPendingOrders = async()=>{
    setIsLoading(true);
    try {
      const res = await publicRequest.get("order/pending");
      setPendingOrders(res?.data.pendingOrders);
      setTotalPendingCost(res?.data.totalPendingCost);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }

  const getReturnedOrdersLast7Days = async()=>{
    setIsLoading(true);
    try {
      const res = await publicRequest.get("order/returnedOrders");
      setReturnedOrdersLast7Days(res?.data?.returnedOrdersLast7Days);
      setReturnedRevenueLast7Days(res?.data?.returnedRevenueLast7Days);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }



  useEffect(() => {
    getAllOrders();
    getTotalOrder();
    // getOrdersForLast7Days()
    getConfirmedOrdersLast7Days()
    getPendingOrders()
    getReturnedOrdersLast7Days()
  }, []);
  return {
    isLoading,
    orders,
    error,
    createNewOrders,
    deleteOrder,
    // updateOrder,
    getSingleOrderById,
    totalOrders,
    totalRevenueLast7Days,
    totalOrdersLast7Days,
    pendingOrders,
    totalPendingCost,
    totalConfirmedRevenue,
    totalConfirmedOrders,
    returnedOrdersLast7Days,
    returnedRevenueLast7Days
  };
};

// const createNewOrders =  async (orderData)=>{
//   // console.log(orderData, "heyyyy");
//   setisLoading(true);
//   try {
//       const res = await axios.post("https://localhost:5000/api/v1/order/orderlist", orderData)
//       console.log(res, "heeeloooo");
//       setOrders(res?.data)
//       if (res.error) {
//         toast({
//           title: "error",
//           description: res.error?.message,
//         });
//         return;
//       }
//       toast({
//         title: "Success ✅✅",
//         description: "Order created successfully",
//       });
//   } catch (error) {
//     console.log(error);
//     setError(error)
//     toast({
//       title: "error",
//       description: error.error.message,
//     });
//   } finally {
//     setIsLoading(false);
//   }

// }

// const deleteOrder = async (orderId) => {
//   setIsLoading(true);
//   try {
//     const res = await axios.delete(
//       `http://localhost:5000/api/v1/order/deleteorderlist/${id}`
//     );
//     console.log(res, "delete order");
//     setOrders(res?.data);
//     toast({
//       title: "Success ✅✅",
//       description: "Order deleted successfully",
//     });
//   } catch (error) {
//     setError(error);
//     toast({
//       title: "Error",
//       description: error.message,
//     });
//   } finally {
//     setIsLoading(false);
//   }
// };
