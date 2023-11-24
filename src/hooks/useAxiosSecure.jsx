import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";



const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useaxiosSecure = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { logOut } = useAuth();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()
    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, (error) => {
        return Promise.reject(error)
    })

    // axiosSecure.interceptors.response.use((config) => {
    //     return config
    // }, async (error) => {
    //     const status = error.response.status;
    //     if (status === 401 || status === 403) {
    //         logOut();
    //         navigate('/login')
    //     }
    //     return Promise.reject(error)
    // })
    return axiosSecure;
};

export default useaxiosSecure;