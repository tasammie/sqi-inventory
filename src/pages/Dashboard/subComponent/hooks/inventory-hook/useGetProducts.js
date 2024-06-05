import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";

export const useGetProduct = () => {
  const [product, setProduct] = useState(null);
  const [productStatus, setProductStatus] = useState([]);
  const [handleAddProduct, setHandleAddProduct] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);
  const [imageFile, setImageFile] = useState();
  const [imageSrc, setImageSrc] = useState()
  const { toast } = useToast();

    
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productCategory: "",
    productImage: "",
    stock: "",
  });

//   console.log(setImageFile, "imageFile",);


  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };
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




const addSingleProduct = async () => {
    console.log(imageFile);
    // if(!imageFile)
    //     return ("Please select an image");
    const formDataState = new FormData();
    formDataState.append("name", formData.productName);
    formDataState.append("price", formData.productPrice);
    formDataState.append("description", formData.productDescription);
    formDataState.append("category", formData.productCategory);
    formDataState.append("stock", formData.stock);
    formDataState.append("image", imageFile);
    setLoading(true);
    
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/product/addProduct",
        formDataState,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setHandleAddProduct(res?.data);
      if (res.error) {
        toast({
          title: "error",
          description: res.error.message,
        });
        return;
      }
      toast({
        title: "Success ✅✅",
        description: "product created successfully",
      });
    } catch (error) {
      console.log(error);
      setError(error);
      toast({
        title: "error",
        description: error.error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  




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
    addSingleProduct,
    handleAddProduct,
    handleChange,
    formData,
    setFormData,
    setImageFile
    
  };
};
