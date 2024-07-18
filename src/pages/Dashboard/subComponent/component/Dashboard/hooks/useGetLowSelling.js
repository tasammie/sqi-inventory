import { publicRequest } from "@/shared/Api/request";
import { useEffect, useState } from "react";

export const useGetLowSelling = () => {
  const [isError, setError] = useState();
  const [isLoading, setLoading] = useState();
  const [lowStockProducts, setLowStockProducts] = useState();

  const getLowSelling = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await publicRequest.get("/product/lowselling");
      setLowStockProducts(res?.data?.lowStockProducts);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    getLowSelling();
  }, []);
  return {
    lowStockProducts,
    isLoading,
    isError,
  };
};
