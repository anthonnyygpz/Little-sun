import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const apiQuote: AxiosInstance = axios.create({
  baseURL: "http://0.0.0.0:8000/api_v1", // URL de tu API
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
