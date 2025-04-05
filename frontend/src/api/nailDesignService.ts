import { API_CONFIG } from "../constants/api";
import { apiService } from "./apiService";
import { NailDesign, CreateNailDesign } from "../types/nailDesign.types";
import { AxiosError } from "axios";

export const nailDesignService = {
  createNailDesign: async (token: string, newNailDesign: CreateNailDesign) => {
    try {
      const response = await apiService.post(
        API_CONFIG.ENDPOINTS.NAIL_DESIGN,
        newNailDesign,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    } catch (error) {
      console.error(String(error));
      return Promise.reject(
        error instanceof AxiosError
          ? new Error(error.response?.data?.message || "Error de red")
          : new Error("Error desconocido"),
      );
    }
  },
  listNailDesign: async (
    token: string,
    skip: number = 0,
    limit: number = 100,
  ): Promise<NailDesign[]> => {
    try {
      const response = await apiService.get(
        API_CONFIG.ENDPOINTS.NAIL_DESIGN + `?skip=${skip}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    } catch (error) {
      console.error("Error to list nail design: ", error);
      return Promise.reject(
        error instanceof AxiosError
          ? new Error(error.response?.data?.message || "Error de red")
          : new Error("Error desconocido"),
      );
    }
  },
  deleteNailDesign: async (token: string, id: number) => {
    try {
      const response = await apiService.delete(
        API_CONFIG.ENDPOINTS.NAIL_DESIGN + id,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    } catch (error) {
      console.error("Error to delete nail design", error);
      return Promise.reject(
        error instanceof AxiosError
          ? new Error(error.response?.data?.message || "Error de red")
          : new Error("Error desconocido"),
      );
    }
  },
};
