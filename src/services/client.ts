import axios from 'axios';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
const baseURL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_URL;

const client = axios.create({
  baseURL,
  headers,
  timeout: 8000,
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const originalConfig = error.config;
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
    }
    return Promise.reject(error.response.data);
  }
);

export default client;
