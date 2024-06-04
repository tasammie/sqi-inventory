
import axios from 'axios';

const UserRequest = axios.create({
    baseURL: 'http://localhost:5000/api/v1', // replace with your base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export { UserRequest };
