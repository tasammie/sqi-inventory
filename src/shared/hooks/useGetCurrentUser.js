import { setUser } from "@/Redux/feature";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserRequest } from "../Api/request";

export const useGetCurrentUser = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const [reflect, setReflect] = useState(false);
  // const dispatch = useDispatch();

  const getCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/');
      return;
    }
    try {
      const res = await UserRequest().get("/users/checkAuth");
      if (res?.data) {
        setCurrentUser(res?.data);
        setReflect(true);
        // dispatch(setUser(res?.data));
      }
    } catch (error) {
      console.log(error);
      navigate('/');
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    getCurrentUser();
  }, [reflect]);

  return {
    logout,
    currentUser,
  };
};

export default useGetCurrentUser;



