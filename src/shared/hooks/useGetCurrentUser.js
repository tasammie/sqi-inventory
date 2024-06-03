import {  setUser } from "@/Redux/feature";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useGetCurrentUser = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [reflect, setreflect] = useState(false);
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/v1/users/checkAuth", {
        headers: { Authorization: "Bearer " + token },
      });
      if(res?.data){
        setCurrentUser(res?.data);

        setreflect(true)
      
      dispatch(setUser(res?.data))
      }
    } catch (error) {
        console.log(error);
    }
};
// console.log(currentUser, 'mee')

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
