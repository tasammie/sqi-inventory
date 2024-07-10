import { useToast } from "@/components/ui/use-toast";
import { publicRequest } from "@/shared/Api/request";
// import axios from "axios";
import { useEffect, useState } from "react";

export const useGetProduct = () => {
  const [products, setProduct] = useState();
  const [productStatus, setProductStatus] = useState([]);
  const [handleAddProduct, setHandleAddProduct] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState();
  const [imageFile, setImageFile] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [categoryIn7Days, setCategoryIn7Days] = useState()
  const [totalProducts, setTotalProducts] = useState(0); // Initialize totalProducts
  const [totalRevenue, setTotalRevenue] = useState(0);   // Initialize totalRevenue
  const [revenueIn7Days, setRevenueIn7Days] = useState(0);   // Initialize totalRevenue
  const [productsCount, setProductsCount] = useState()
  const [lowstock, setLowStock] = useState(0)
  const [notInStock, setNotInStock] = useState()
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productCategory: "",
    productImage: "",
    stock: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name==='productImage' && files) {
      setImageFile(files);
      const previewUrl = URL.createObjectURL(files[0]);
      setImagePreview(previewUrl);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const addSingleProduct = async () => {
    setLoading(true);

    const formDataState = new FormData();
    if (imageFile) {
      formDataState.append("name", formData.productName);
      formDataState.append("price", formData.productPrice);
      formDataState.append("cost", formData.productCost);
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
        console.log(res, "check");
        setHandleAddProduct(res?.data);
        if (res.error) {
          toast({
            title: "error",
            description: res.error?.message,
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
    }
  };

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const res = await publicRequest.get("/product/getAllProducts");
      setProduct(res?.data?.result);
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
      const res = await publicRequest.get("/status");
      setProductStatus(res.data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getProductIn7days = async () =>{
    setLoading(true);
    try {
      const res = await publicRequest.get("/product/totalProductsIn7Days");
      // console.log(res, "resss");
      setTotalProducts(res?.data.totalProducts); // Update totalProducts state
      setRevenueIn7Days(res?.data.revenueIn7Days);   // Update totalRevenue state
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getTopSellingProd = async () =>{
    setLoading(true);
    try {
      const res = await publicRequest.get("/product/topSellingProductsIn7Days");
      // console.log(res, "top selling");
      setProductsCount(res?.data?.productCount);
      setTotalRevenue(res?.data.totalRevenue); // Update totalRevenue state
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoriesIn7Days = async ()=>{
    setLoading(true);
    try {
      const res = await publicRequest.get("/product/categoryIn7Days");
      setCategoryIn7Days(res?.data?.totalCategories); 
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const getLowStock = async()=>{
    setLoading(true);
    try {
      const res = await publicRequest.get("/product/lowstock");
      setLowStock(res?.data?.lowStockProducts); 
      setNotInStock(res?.data?.unavailableProducts);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts();
    getProductIn7days();
    checkStatus();
    getCategoriesIn7Days()
    getTopSellingProd();
    getLowStock()
    
  }, []);

  return {
    products,
    getProductIn7days,
    notInStock,
    lowstock,
    productsCount,
    totalRevenue,
    productStatus,
    isLoading,
    isError,
    handleAddProduct,
    addSingleProduct,
    totalProducts,
    handleChange,
    formData,
    setFormData,
    setImageFile,
    imagePreview,
    imageFile,
    isLoading,
    categoryIn7Days,
    revenueIn7Days
  };
};
