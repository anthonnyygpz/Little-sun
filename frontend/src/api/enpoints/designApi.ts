import { DesignCreate, DesignUpdate } from "../../models/design.models.ts";
import apiClient from "../apiClient.ts";

export const addDesignApi = async (design: DesignCreate) => {
  try {
    const response = await apiClient.post("/designs/create", design);
    return response.data;
  } catch (error) {
    console.error("Error creating design: ", error);
    throw new Error("Failded to create designs");
  }
};

export const fetchDesign = async () => {
  try {
    const response = await apiClient.get("/designs/all");
    return response.data;
  } catch {
    throw new Error("Failded to fetch designs");
  }
};

export const updateDesignApi = async (design: DesignUpdate) => {
  try {
    const response = await apiClient.put("/designs/update", design);
    return response.data;
  } catch (error) {
    console.error("Error updating design: ", error);
    throw new Error("Failded to update designs");
  }
};

export const deleteDesignApi = async (id: number) => {
  try {
    const response = await apiClient.delete("/designs/delete?design_id=" + id);
    return response.data;
  } catch (error) {
    console.error("Error deleting design: ", error);
    throw new Error("Failded to delete designs");
  }
};
