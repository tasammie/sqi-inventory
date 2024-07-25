import { useToast } from "@/components/ui/use-toast";
import { useState } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";
import { UserRequest } from "@/shared/Api/request";



const formSchema = z.object({
    firstName: z.string().nonempty("First Name is required"),
    lastName: z.string().nonempty("Last Name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Password is required"),
})

export const useSignUp = () => {
    const [isLoading, setisLoading] = useState(false);
    const navigate = useNavigate()
    const {toast} = useToast();

    const form = useForm({
        resolver: zodResolver(formSchema)
    });

    const onSubmit = async (data) => {
        setisLoading(true)
        try {
            const res = await UserRequest.post("/users/register", data);
            toast({
                title: "Success",
                description: `${res?.data?.firstName} Welcome to Our Website pls login`,
              });

              if (res.data){
                navigate("/dashboard");
              }

            // if (res.status === 201) {
            //     toast.success("Registration Successful")
            //     navigate("/login")
            // }
        } catch (error) {
            console.log(error);
        }
        setisLoading(false)
    }

  return{
    form,
    isLoading,
    onSubmit 
  }
}

export default useSignUp
