
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://0.0.0.0:8080/StudentDesignerMarketplace',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Making API request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('API response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Response error:', error?.response?.status, error?.config?.url, error?.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
