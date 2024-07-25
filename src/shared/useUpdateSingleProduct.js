import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { publicRequest } from "./Api/request";

export const useUpdateSingleProduct = () => {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(null);
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const { toast } = useToast();
    

    const updateProduct = async (formData, id) => {
        setLoading(true);
        try {
            console.log(formData, 'test');
            const res = await publicRequest.patch(
                `/product/updateproduct/${id}`,
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
