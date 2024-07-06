import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const useUpdateSingleProduct = () => {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(null);
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const { toast } = useToast();
    
    // console.log(id, "ifdd");
    const updateProduct = async (formData, id) => {
        setLoading(true);
        try {
            console.log(formData, 'test');
            const res = await axios.patch(
                `http://localhost:5000/api/v1/product/updateproduct/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );  
            if (res.data.error) {
                toast({
                    title: "Error",
                    description: res.data.error.message,
                });
                return;
            }
            toast({
                title: "Success ✅✅",
                description: "Product updated successfully",
            });
            console.log(res.data)
            setProduct(res.data);
        } catch (error) {
            setError(error);
            toast({
                title: "Error",
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        isError,
        isLoading,
        updateProduct,
        product,
        setProduct,
    };
};
