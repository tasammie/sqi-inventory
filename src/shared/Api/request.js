import axios from 'axios';

const baseURL = 'http://localhost:5000/api/v1'

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
