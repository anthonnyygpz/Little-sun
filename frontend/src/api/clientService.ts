import { API_CONFIG } from "../constants/api";
import { Client } from "../types/client.types";
import { apiService } from "./apiService";

export const clientService = {
  listClient: async (token: string): Promise<Client[]> => {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.CLIENTS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error to list client: ", error);
      throw new Error("Faild to list client: ");
    }
  },
  deleteClient: async (token: string, id: number) => {
    try {
      const response = await apiService.delete(
        API_CONFIG.ENDPOINTS.CLIENTS + id,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      return response.data;
    } catch (error) {
      console.error("Error to delete client: ", error);
      throw new Error("Faild to delete client: ");
    }
  },
};
