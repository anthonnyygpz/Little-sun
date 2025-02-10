import apiClient from "../apiClient.ts";

export const fetchServices = async () => {
  try {
    const response = await apiClient.get("/services/");
    return response.data;
  } catch {
    throw new Error("Failded to fetch services");
  }
};
