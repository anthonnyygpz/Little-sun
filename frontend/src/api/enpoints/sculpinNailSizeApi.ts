import apiClient from "../apiClient.ts";
export const fetchSculpings = async () => {
  try {
    const response = await apiClient.get("/sculpign_nail_size/all");
    return response.data;
  } catch {
    throw new Error("Failded to fetch quotes");
  }
};

export const getByIdSculping = async (id: number) => {
  try {
    const response = await apiClient.get("/sculpign_nail_size/get_by_id?id=" + id);
    return response.data;
  } catch {
    throw new Error("Failded to fetch quotes");
  }
}

