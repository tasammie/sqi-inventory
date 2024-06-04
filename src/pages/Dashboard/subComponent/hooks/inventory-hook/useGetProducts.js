import axios from "axios";
import { useEffect, useState } from "react";

export const useGetProduct = () => {
  const [product, setProduct] = useState(null);
  const [productStatus, setProductStatus] = useState([]);
  const [handleAddProduct, setHandleAddProduct] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/v1/product/getAllProducts");
      setProduct(res?.data.result);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/v1/status");
      setProductStatus(res.data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };


  const addSingleProduct = async (product) => {
    setLoading(true);
    
    try {
       const res = await axios.post("http://localhost:5000/api/v1/product/addProduct", product);
       console.log(res.data, "Product added");
       setHandleAddProduct(res?.data);
    } catch (error) {
        console.log(error);
        setError(error);
    } finally {
        setLoading(false);
    }
  }




  useEffect(() => {
    getAllProducts();
    checkStatus();
    // addSingleProduct();
  }, []);

  return {
    product,
    productStatus,
    isLoading,
    isError,
    getAllProducts,
    checkStatus,
    addSingleProduct
  };
};
