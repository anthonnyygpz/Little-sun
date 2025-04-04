import { API_CONFIG } from "../constants/api";
import { apiService } from "./apiService";
import { NailService } from "../types/nailService.types";

export const nailServiceService = {
  listNailService: async (
    token: string,
    skip: number = 0,
    limit: number = 100,
  ): Promise<NailService[]> => {
    try {
      const response = await apiService.get(
        API_CONFIG.ENDPOINTS.NAIL_SERVICE + `?skip=${skip}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error to list nail service.");
    }
  },
  deleteNailService: async (token: string, id: number) => {
    try {
      const response = await apiService.delete(
        API_CONFIG.ENDPOINTS.NAIL_SERVICE + id,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error to delete nail service.");
    }
  },
};
