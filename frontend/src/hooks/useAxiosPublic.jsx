import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: 'http://localhost:9000'
   baseURL: "https://api.amdeco-renovation.fr",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
