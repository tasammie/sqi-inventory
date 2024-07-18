import { publicRequest } from "@/shared/Api/request";
import { useEffect, useState } from "react";


export const useGetCategory = () => {
    const [category, setCategory] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const getCategory = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await publicRequest.get('/product/categories')
            // console.log(res, "categories");
            setCategory(res?.data?.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }



    useEffect(()=>{
        getCategory();
    }, [])



  return {
    category,
    error,
    loading,
    
  }
}


