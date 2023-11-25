import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";





const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const logOut = useContext(AuthContext);
    // interceptors for request
    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, (error) => {
        return Promise.reject(error)
    })

    axiosSecure.interceptors.response.use((config) => {
        return config
    }, async (error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            logOut();

        }
        return Promise.reject(error)
    })
    return axiosSecure;
};

export default useAxiosSecure;