import { publicRequest } from "@/shared/Api/request";
import { useEffect, useState } from "react";

export const useGetDashboardStat = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const [totalSales, setTotalSales] = useState();
  const [totalCost, setTotalCost] = useState();
  const [totalProfit, setTotalProfit] = useState();
  const [totalSalesRevenue, setTotalSalesRevenue] = useState();

  const getAllSales = async () => {
    setIsLoading(true);
    try {
      const res = await publicRequest.get("/sales/allTimeRecords");
      console.log(res, "dashboard");
      setTotalCost(res?.data?.totalCost);
      setTotalProfit(res?.data.totalProfit);
      setTotalSales(res?.data.totalSales);
      setTotalSalesRevenue(res?.data.totalSalesRevenue);
    } catch (error) {
        console.log(error, "dashboard error");
        setError(error);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllSales();
  }, []);

  return {
    isLoading,
    error,
    totalCost,
    totalProfit,
    totalSales,
    totalSalesRevenue
    
  };
};
