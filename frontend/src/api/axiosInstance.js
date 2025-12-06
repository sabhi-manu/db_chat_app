import axios  from "axios"

 const axiosInstance = axios.create({
    baseURL:'https://chat-backend-qfh7.onrender.com/api',
    withCredentials: true
})


export default axiosInstance;

