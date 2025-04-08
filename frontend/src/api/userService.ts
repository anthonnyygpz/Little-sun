import { apiService } from "./apiService";
import { UserCreate } from "../types/user.types";
import { API_CONFIG } from "../constants/api";
import axios from "axios";

export const userService = {
  createUser: async (user: UserCreate) => {
    try {
      const response = await apiService.post(API_CONFIG.ENDPOINTS.USERS, user);
      return response.data;
    } catch (error) {
      let errorMessage =
        "Error al crear usuario. Por favor intente nuevamente.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.detail;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      console.error("Error to create user: ", error);
      throw new Error(errorMessage);
    }
  },
};
