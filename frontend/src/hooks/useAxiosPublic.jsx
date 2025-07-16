import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://construction-paid-projects-6aga.vercel.app'
    
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;