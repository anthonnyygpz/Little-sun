import { UserCreate } from "../../features/shared/types/userTypes";
import apiClient from "../apiClient";

export const register = async (newUser: UserCreate) => {
  try {
    const response = await apiClient.post("/users/", newUser);
    return response.data;
  } catch (error) {
    console.log("Error create user: ", error);
    throw new Error("Failed to create user");
  }
};
