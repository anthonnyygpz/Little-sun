import { API_CONFIG } from "../constants/api";
import { AuthResult, Credentials } from "../types/auth.types";
import { apiAuthService } from "./apiService";

export const authService = {
  login: async (credentials: Credentials): Promise<AuthResult> => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", credentials.email);
      formData.append("password", credentials.password);

      const response = await apiAuthService.post(
        API_CONFIG.ENDPOINTS.AUTH_LOGIN,
        formData,
      );
      return response.data;
    } catch (error) {
      console.error("Error authentication: ", error);
      throw new Error("Failed to get token");
    }
  },

  verifyToken: async (token: string) => {
    try {
      const response = await apiAuthService.post(
        API_CONFIG.ENDPOINTS.VERIFY_TOKEN + `?token=${token}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Invalid token");
    }
  },
};
