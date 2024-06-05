import axios from "axios";
import { useState } from "react";

export const useGetSingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getSingleProd = async (id) => {
    console.log(id, "hdhdh");
    setLoading(true);
    setIsError(false);
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/product/getproduct/${id}`);
      console.log(res, "logging res");
      setProduct(res?.data);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    getSingleProd,
    loading,
    isError,
    product,
  };
};

