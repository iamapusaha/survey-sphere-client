import axios from "axios";







const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    // interceptors for request
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
    //         // logOut();
    //     }
    //     return Promise.reject(error)
    // })
    return axiosSecure;
};

export default useAxiosSecure;