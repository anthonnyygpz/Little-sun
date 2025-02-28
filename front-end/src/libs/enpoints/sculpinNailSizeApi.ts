import apiClient from "../apiClient.ts";

export const getAllSculpingApi = async () => {
  try {
    const response = await apiClient.get("/sculpign_nail_size/all");
    return response.data;
  } catch {
    throw new Error("Failded to fetch quotes");
  }
};

export const getByIdSculpingApi = async (id: number) => {
  try {
    const response = await apiClient.get(
      "/sculpign_nail_size/get_by_id?id=" + id,
    );
    return response.data;
  } catch {
    throw new Error("Failded to fetch quotes");
  }
};

export const deleteSculpingApi = async (id: number) => {
  try {
    const response = await apiClient.get(
      "/sculping_nail_size/delete?size_id=" + id,
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error; // Opcional: puedes relanzar el error si necesitas manejarlo en otro lugar
  }
};
