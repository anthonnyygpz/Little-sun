import { API_CONFIG } from "../constants/api";
import { SculpingNailSize } from "../types/sculpingNailSize.types";
import { apiService } from "./apiService";

export const sculpingNailsize = {
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
      console.error("Error to list sculping nail size: ", error);
      throw new Error("Error to list sculping nail size");
    }
  },
};
