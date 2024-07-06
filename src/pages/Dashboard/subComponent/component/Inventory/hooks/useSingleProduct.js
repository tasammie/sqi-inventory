import { useToast } from "@/components/ui/use-toast";
import { publicRequest } from "@/shared/Api/request";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useGetSingleProduct = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const {toast} = useToast()
  const navigation = useNavigate()

  const getSingleProd = async (id) => {
    // console.log(id, "hdhdh");
    setLoading(true);
    setIsError(false);
    try {
      const res = await publicRequest.get(`product/getproduct/${id}`)
      setProduct(res?.data?.result);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };


  const deleteProduct = async(id)=>{
    setLoading(true);
    try {
      const res = await publicRequest.delete(`product/delete/${id}`)
      setProduct(res?.data?.result);
      toast({
        title: "Product Deleted ✅✅",
        description: "Product Deleted Successfully",
      })
      navigation('/dashboard/Inventory')
    } catch (error) {
      console.log(error);
      setIsError(error);
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message,
      });
    } finally {
      setLoading(false);
    }
  }

 




  return {
    getSingleProd,
    loading,
    isError,
    product,
    deleteProduct
  
  };
};

