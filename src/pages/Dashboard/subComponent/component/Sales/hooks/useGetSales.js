import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicRequest } from '@/shared/Api/request';

const baseURL = 'http://localhost:5000/api/v1';

const UserRequest = () => {
    const token = localStorage.getItem("token");
    return axios.create({
        baseURL,
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
}

const request = UserRequest();

export const useGetSales = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [sales, setSales] = useState([]);
    const [error, setError] = useState(null);
    const [totalSales, setTotalSales] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalSalesInLast7days, setTotalSalesInLast7Days] = useState(0);
    const [profit, setProfit] = useState(0);
    const [paidSales, setPayedSales] = useState(0);
    const [paidSalesRevenue, setPaidSalesRevenue] = useState(0);
 
  

    const { toast } = useToast();
    // const navigation = useNavigate();

    const getAllSales = async () => {
        try {
            setIsLoading(true);
            const res = await publicRequest.get("/sales/getAllSales");
            setSales(res?.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    };

    const createNewSale = async (saleData) => {
        setIsLoading(true);
        try {
            const res = await request.post("/sales/createSale", saleData);
            // console.log(res, "Sale created");
            setSales((prevSales) => [...prevSales, res?.data]);
            toast({
                title: "Success ✅✅",
                description: "Sale created successfully",
            });
            getAllSales();
        } catch (error) {
            setIsLoading(false);
            // console.log(error, "fd error");
            if (error.response && error.response.status === 400) {
                toast({
                    title: "Error ❌❌",
                    description: "Stock is not sufficient for the requested quantity ❌",
                    status: "error",
                });
            } else {
                setError(error);
                toast({
                    title: "Error",
                    description: "Failed to create sale",
                    status: "error",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const deleteSale = async (id) => {
        setIsLoading(true);
        try {
            const res = await publicRequest.delete(`/sales/deleteSale/${id}`);
            setSales((prevSales) => prevSales.filter(sale => sale._id !== id));
            toast({
                title: "Success ✅✅",
                description: "Sale deleted successfully",
            });
            getAllSales();
        } catch (error) {
            setError(error);
            toast({
                title: "Error",
                description: error.response?.data?.message || error.message,
                status: "error",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const getAllSalesLast7Days = async () => {
        setIsLoading(true);
        try {
            const res = await UserRequest().get("/sales/salesIn7days");
            // console.log(res);
            setTotalSalesInLast7Days(res?.data?.totalSalesInLast7days);
            // setTotalRevenueLast7Days(res?.data?.totalRevenueLast7Days);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getPendingSales = async () => {
        setIsLoading(true);
        try {
            const res = await publicRequest.get("/sales/pendingSales");
            setTotalSales(res?.data?.totalSales);
            setTotalRevenue(res?.data?.totalRevenue);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getProfitsMadeLast7Days = async () => {
        setIsLoading(true);
        try {
            const res = await publicRequest.get("/sales/profit");
            // console.log(res, "profite");
            setProfit(res?.data?.totalProfit);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getPaidSalesIn7days = async () => {
        setIsLoading(true);
        try {
            const res = await publicRequest.get("/sales/paidsalesIn7days");
            setPayedSales(res?.data.totalSales);
            setPaidSalesRevenue(res?.data?.totalRevenue)
            // console.log(res, "paid sales");
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAllSales();
        getAllSalesLast7Days();
        getPendingSales();
        getProfitsMadeLast7Days();
        getPaidSalesIn7days()
    }, []);

    return {
        isLoading,
        sales,
        error,
        createNewSale,
        deleteSale,
        profit,
        totalSales,
        totalRevenue,
        totalSalesInLast7days,
        paidSales,
        paidSalesRevenue,
        
        
        
    };
};

