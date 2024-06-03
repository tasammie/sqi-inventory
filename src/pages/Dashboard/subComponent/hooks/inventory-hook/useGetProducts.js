import axios from "axios";
import { useEffect, useState } from "react";


export const useGetProduct = () => {
    const [product, setProduct] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(null);

   async function getAllProducts (){
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5000/api/v1/product/getAllProducts")
            // console.log(res);
           setProduct(res?.data.result);
        //    console.log(res?.data);
        } catch (error) {
            console.log(error);
            setError(true, error);
        }finally {
            setLoading(false);
        }

    }

    useEffect(()=>{
        getAllProducts();
    },[] )


    return{
        product,
        isLoading,
        isError,
        getAllProducts

    }
}

