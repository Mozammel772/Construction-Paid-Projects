import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://api.amdeco-renovation.fr'

})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;