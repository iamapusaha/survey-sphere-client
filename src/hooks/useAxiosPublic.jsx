import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000'
})
const useaxiosPublic = () => {
    return axiosPublic;
};

export default useaxiosPublic;