import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { publicRequest } from '@/shared/Api/request';

export const useProfile = () => {

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    gender: '',
    password: '',
    profile_image: ''
  });

 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await publicRequest.get('/api/user/current');
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (formData.password && formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    try {
      await publicRequest.put('/api/user/update', formData);
      setLoading(false);
      navigate('/profile');
    } catch (error) {
      setLoading(false);
      console.error('Error updating profile:', error);
    }
  };

  return {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit
  };
};









// import { publicRequest } from "@/shared/Api/request";
// import { useEffect, useState } from "react";

// export const useGetUserProfile = () => {
//   const [userProfile, setUserProfile] = useState();
//   const [error, setError] = useState();
//   const [isLoading, setIsLoading] = useState();

//   const getUserProfile = async () => {
//     try {
//       const response = await publicRequest.get("/api/user/profile");
//       setUserProfile(response.data);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   useEffect(() => {
//     getUserProfile();
//   }, []);

//   return {};
// };
