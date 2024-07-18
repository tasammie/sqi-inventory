import { publicRequest } from "@/shared/Api/request";
import { useEffect, useState } from "react";

export const useGetTopselling = () => {
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState();
  const [result, setResult] = useState();

  const getTopselling = async () => {
    setIsLoading(true);
    try {
      const res = await publicRequest.get("/product/topselling");
    //   console.log(res, "result");
      setResult(res?.data?.result);
    } catch (error) {
      setIsError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTopselling();
  },[]);

  return {
    isLoading,
    isError,
    result,
  };
};
