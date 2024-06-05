import { useToast } from "@/components/ui/use-toast";
// import { publicRequest } from "@/shared/Api/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  title: z.string("title must be a string").min(2).max(20),
  description: z.string("description must be a string").min(2),
  price: z.string("price must be a string"),
  category: z.string("category must be a string").min(2).nullable().optional(),
});

export const useSubmitForm = () => {
  const [imageSrc, setimageSrc] = useState();
  const [imageFile, setimageFile] = useState();

  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(data) {
    if (!imageFile) return alert("please upload an image");

    const formData = new FormData();

    formData.append("image", imageFile);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);

    try {
      // const res = await fetch("http://localhost:3000/api/v1/createProduct", {
      //   method: "POST",
      //   body: formData,
      // });
      // const dataRes = await res.json();
    //   const res = await publicRequest.post("/createProduct", formData)
      // console.log(res);
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
      navigate("/products");
    } catch (error) {
      console.log(error.error);
      toast({
        title: "error",
        description: error.error.message,
      });
    }
  }

  function handleChange(e) {
    const file = e.target.files[0];

    const reader = new FileReader();
    if (file) {
      setimageFile(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        setimageSrc(reader.result);
      };
    }
  }

  return { onSubmit, form, handleChange, imageSrc };
};
