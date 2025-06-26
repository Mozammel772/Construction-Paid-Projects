import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://construction-project-l8m8.onrender.com'
    
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;