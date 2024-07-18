import { publicRequest } from "@/shared/Api/request";
import { useEffect, useState } from "react";


export const useGetDashboardOrderStat = () => {
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();
    const [totalOrders, setTotalOrders] = useState();
    const [totalRevenue, setTotalRevenue] = useState();
    const [returnedOrderRevenue, setReturnedOrderRevenue] = useState();
    const [numberOfReturnedOrders, setNumberOfReturnedOrders] = useState();
    const [totalCost, setTotalCost] = useState()


    const getAllOrderStat = async ()=>{
        setIsLoading(true);
        try {
        const res = await publicRequest.get('/order/alltimeorders')
        setTotalOrders(res?.data?.totalOrders);
        setTotalRevenue(res?.data?.totalRevenue);
        setReturnedOrderRevenue(res?.data?.returnedOrderRevenue);
        setNumberOfReturnedOrders(res?.data?.numberOfReturnedOrders);
        setTotalCost(res?.data?.totalCost);
        setIsLoading(false);
        } catch (error) {
            console.log(error);
            setError(error.message);
        } finally {
            setIsLoading(false);
            setError(null);
        }
    }



    useEffect(()=>{
        getAllOrderStat()
    }, [])
  return {
    isLoading,
    error,
    totalOrders,
    totalRevenue,
    returnedOrderRevenue,
    numberOfReturnedOrders,
    totalCost,

  }
}


