import apiClient from "../apiClient.ts";
export const fetchDesign = async () => {
  try {
    const response = await apiClient.get("/designs/");
    return response.data;
  } catch {
    throw new Error("Failded to fetch designs");
  }
};
