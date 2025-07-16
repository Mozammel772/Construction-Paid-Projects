// useAxiosSecure.js
import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'https://construction-paid-projects-6aga.vercel.app',
  withCredentials: true,
});

axiosSecure.interceptors.response.use(
  res => res,
  error => {
    if (error.response?.status === 440) {
      localStorage.removeItem('access-token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const useAxiosSecure = () => {
  return axiosSecure; // ✅ return the actual axios instance
};

export default useAxiosSecure;
