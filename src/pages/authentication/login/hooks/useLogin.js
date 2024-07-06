
import { useToast } from '@/components/ui/use-toast';
import { UserRequest } from '@/shared/Api/request';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const useLogin = () => {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const { toast } = useToast();

    const input = [
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Enter your email",
            required: true,
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter your password",
            required: true,
        },
    ];

    const formSchema = z.object({
        email: z
            .string()
            .email("Invalid email address")
            .nonempty("Email is required"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .nonempty("Password is required"),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data) => {
        setisLoading(true);
        try {
            const res = await UserRequest().post("/users/login", data);
            localStorage.setItem("token", res.data.token);
            toast({
                title: "Success ✅✅",
                description: `You are Logged in`,
            });
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: `${error?.response?.data?.message}`,
            });
        } finally {
            setisLoading(false);
        }
    };

    return {
        onSubmit,
        input,
        isLoading,
        form,
    };
};

export default useLogin;
