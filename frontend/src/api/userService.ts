import { apiService } from "./apiService";
import { UserCreate } from "../types/user.types";
import { API_CONFIG } from "../constants/api";

export const userService = {
  createUser: async (user: UserCreate) => {
    try {
      const response = await apiService.post(API_CONFIG.ENDPOINTS.USERS, user);
      return response.data;
    } catch (error) {
      console.error("Error to create user: ", error);
      throw new Error("Error to create user");
    }
  },
};
