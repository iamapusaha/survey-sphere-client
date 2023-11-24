import axios from "axios";

const axiousSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiousSecure = () => {
    axios.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token');
        config.headers.Authorization(`Bearer ${token}`)
        return config;
    }, (error) => {
        return Promise.reject(error)
    })
    return axiousSecure;
};

export default useAxiousSecure;