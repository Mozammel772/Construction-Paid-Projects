import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: 'http://localhost:5000'
  baseURL: 'https://backend-two-ruby-25.vercel.app'
  //  baseURL: "https://backend-two-ruby-25.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
