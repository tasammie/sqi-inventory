import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useGetCurrentUser = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();

  const getCurrentUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/checkAuth", {
        headers: { Authorization: "Bearer " + token },
      });
      setCurrentUser(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return {
    logout,
    currentUser,
  };
};

export default useGetCurrentUser;
