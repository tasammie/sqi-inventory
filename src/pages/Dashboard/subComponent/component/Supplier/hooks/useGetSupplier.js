import { publicRequest } from "@/shared/Api/request";
import { set } from "date-fns";
import { useEffect, useState } from "react";

export const useGetSupplier = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [supplier, setSupplier] = useState();


  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    productName: "",
    category: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getSupplier = async () => {
    setIsLoading(true);
    try {
      const res = await publicRequest.get("/supplier/suppliers");
    //   console.log(res, "supplier");
      setSupplier(res?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error, "error");
      setIsLoading(false);
      setError(error.message);
    }
  };

  const addSupplier = async () => {
    setIsLoading(true);
    try {
    const res = await publicRequest.post("/supplier/createSupplier", formData);
    console.log(res, "add supplier");
    setSupplier(res?.data)
    toast({
        title: "Success ✅✅",
        description: "Supplier details created successfully",
    });
    setIsLoading
    getSupplier()
    } catch (error) {
        console.log(error);
        toast({
            title: "Error ❌❌",
            description: "Supplier details not uploaded ❌",
            status: "error",
        });
        setIsLoading(false);
        setError(error)
    }

  }

  useEffect(() => {
    getSupplier();
  }, []);

  return {
    isLoading,
    error,
    supplier,
    addSupplier,
    handleChange,
    formData,
  };
};
