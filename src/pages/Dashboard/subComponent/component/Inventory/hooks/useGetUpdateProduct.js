import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import axios from "axios"

export const useGetUpdateProduct = (product)=>{
    const [isLoading, setisLoading]= useState()
    const {id} = useParams()
    const {toast} = useToast()


    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
          productName: "",
          productPrice: "",
          productDescription: "",
          productCategory: "",
          productImage: "",
          stock: "",
        },
      });

    const onSubmit = async (data) => {
        setisLoading(true);
        try {
           const res = await axios.patch( `http://localhost:5000/api/v1/product/updateproduct/${id}`,
            data)
            toast({
                title: "Success ✅✅",
                description: "product updated successfully",
              });
        } catch (error) {
            console.log(error);
        }finally{
            setisLoading(false)
        }
    }


   
    return {
        register,
        handleSubmit,
        onSubmit,
        isLoading,
        setValue,
        useGetUpdateProduct
    }
}