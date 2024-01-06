import axios from 'axios';

import TokenService from './TokenService';

const API_BASE_URL = 'http://localhost:5000/api';

const instance = axios.create({
  baseURL: API_BASE_URL
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;