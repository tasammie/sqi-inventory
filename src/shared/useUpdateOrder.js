import { useToast } from "@/components/ui/use-toast";
import { publicRequest } from "./Api/request";
import { useState } from "react";


export const useUpdateOrder = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [orders, setOrders] = useState();
    const {toast} = useToast()


    const updateOrder = async (OrderId, data) => {
        setIsLoading(true);
        try {
          const res = await publicRequest.patch(
            `order/updateorderlist/${OrderId}`,
            data
          );
          // console.log(res, "update order");
          setOrders(res?.data);
          toast({
            title: "Success ✅✅",
            description: "Order updated successfully",
          });
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





  return {
    updateOrder,
    isLoading,
    error,
    orders,
  }
}

