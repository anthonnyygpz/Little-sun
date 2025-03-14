import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const api_url = import.meta.env.VITE_APP_API_URL;

const token = sessionStorage.getItem("token");

const apiClient: AxiosInstance = axios.create({
  baseURL: `${api_url}api/v1`, // URL de tu API
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token} `,
  },
});

// Interceptor de solicitud para actualizar el token antes de cada solicitud
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Interceptor para manejar errores globalmente
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  },
);

export default apiClient;
