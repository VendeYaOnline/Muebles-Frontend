import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_BACKEND,
  timeout: 10000,
});

axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token_vendeyaonline");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (process.env.NEXT_PUBLIC_COMPANY_ID) {
      config.headers["Company-Id"] = process.env.NEXT_PUBLIC_COMPANY_ID;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
