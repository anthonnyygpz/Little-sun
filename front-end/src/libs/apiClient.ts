import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const api_url = import.meta.env.VITE_APP_API_URL;

const apiQuote: AxiosInstance = axios.create({
  baseURL: `${api_url}api_v1`, // URL de tu API
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para manejar errores globalmente
apiQuote.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  },
);

export default apiQuote;
