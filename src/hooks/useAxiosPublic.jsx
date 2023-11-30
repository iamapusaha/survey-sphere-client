import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://polling-survey-server-blush.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;