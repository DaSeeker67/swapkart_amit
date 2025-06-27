import axios, { type InternalAxiosRequestConfig } from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add auth token to requests
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error:unknown) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor for error handling
import { AxiosError } from 'axios';

API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle common errors (401, 403, etc.)
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      // Optionally redirect to login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;