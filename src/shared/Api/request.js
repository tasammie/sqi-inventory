import axios from 'axios';

const baseURL = import.meta.env.VITE_BaseURL

const publicRequest = axios.create({
    baseURL,
})

const UserRequest = ()=>{
    const token = localStorage.getItem("token");
    return axios.create({
        baseURL,
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}

export { UserRequest, publicRequest,  };
