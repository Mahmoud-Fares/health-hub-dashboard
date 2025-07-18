import axios from 'axios';

const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
   withCredentials: true,
});

api.interceptors.request.use(
   (config) => {
      if (typeof window !== 'undefined') {
         const token = window.localStorage.getItem('token-healthUp');
         if (token) {
            config.headers.Authorization = `Bearer ${token}`;
         }
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

export default api;
