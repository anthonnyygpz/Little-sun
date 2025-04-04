import { API_CONFIG } from "../constants/api";
import { apiService } from "./apiService";
import { NailDesign } from "../types/nailDesign.types";

export const nailDesignService = {
  listNailService: async (
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
      throw new Error("Error to list nail design");
    }
  },
};
