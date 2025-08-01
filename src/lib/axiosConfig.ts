import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        // Add other default headers here if needed
    },
    // You can add more config options here
});

export default axiosInstance; 