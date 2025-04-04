import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { API_CONFIG } from "../constants/api";
// import { LOCAL_STORAGE } from "../constants/localStorage";

// const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);

export const apiService: AxiosInstance = axios.create({
  baseURL: `${API_CONFIG.BASE_URL}`, // URL de tu API
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token} `,
  },
});

// Interceptor de solicitud para actualizar el token antes de cada solicitud
apiService.interceptors.request.use(
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
apiService.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.status === 401) {
      console.error("Not Authorization");
      sessionStorage.removeItem("token");
    }
    console.error("API Error:", error.message);
    return Promise.reject(error);
  },
);

// Authenticacion
export const apiAuthService: AxiosInstance = axios.create({
  baseURL: `${API_CONFIG.BASE_URL}`, // URL de tu API
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

// Interceptor para manejar errores globalmente
apiAuthService.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  },
);
