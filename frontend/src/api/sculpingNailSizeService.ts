import axios from "axios";
import { API_CONFIG } from "../constants/api";
import { CreateSculpingNailSize } from "../types/sculpingNailSize.types";
import { apiService } from "./apiService";

export const sculpingNailsizeService = {
  createSculpingNailSize: async (
    token: string,
    newSculping: CreateSculpingNailSize,
  ) => {
    try {
      const response = await apiService.post(
        API_CONFIG.ENDPOINTS.SCULPING_NAIL_SIZE,
        newSculping,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    } catch (error) {
      let errorMessage =
        "Error al crear el esculpido. Por favor intente nuevamente.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.detail;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      console.error("Error to create sculping nail size: ", error);
      throw new Error(errorMessage);
    }
  },
  listSculpingNailSize: async (
    token: string,
    skip: number = 0,
    limit: number = 100,
  ): Promise<SculpingNailSize[]> => {
    try {
      const response = await apiService.get(
        API_CONFIG.ENDPOINTS.SCULPING_NAIL_SIZE + `${skip}/${limit}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    } catch (error) {
      let errorMessage =
        "Error al obtner el listado de esculpidos. Por favor intente nuevamente.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.detail;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      console.error("Error to list sculping nail size: ", error);
      throw new Error(errorMessage);
    }
  },
  deleteSculpingNailSize: async (token: string, id: number) => {
    try {
      const response = await apiService.delete(
        API_CONFIG.ENDPOINTS.SCULPING_NAIL_SIZE + id,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    } catch (error) {
      let errorMessage =
        "Error al borrar el esculpido. Por favor intente nuevamente.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.detail;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      console.error("Error to delete sculping nail size: ", error);
      throw new Error(errorMessage);
    }
  },
};
