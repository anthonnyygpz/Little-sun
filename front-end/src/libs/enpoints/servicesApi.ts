import {
  ServiceCreate,
  ServiceResponse,
} from "../../features/shared/types/serviceTypes.ts";
import apiClient from "../apiClient.ts";

export const addServiceApi = async (
  newServices: ServiceCreate,
): Promise<ServiceCreate> => {
  try {
    const response = await apiClient.post("/services/create", newServices);
    return response.data;
  } catch (error) {
    console.error("Error adding service: ", error);
    throw new Error("Failded to add service");
  }
};

export const getAllServicesApi = async (): Promise<ServiceResponse> => {
  try {
    const response = await apiClient.get("/services/all");
    return response.data;
  } catch (error) {
    console.error("Error getting service: ", error);
    throw new Error("Failded to get all services");
  }
};

export const updateServiceApi = async (
  editService: ServiceResponse,
): Promise<ServiceResponse> => {
  try {
    const response = await apiClient.put("/services/update", editService);
    return response.data;
  } catch (error) {
    console.error("Error updating service: ", error);
    throw new Error("Failded to update services");
  }
};

export const deleteServiceApi = async (id: number): Promise<object> => {
  try {
    const response = await apiClient.delete(
      "/services/delete?service_id=" + id,
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting service: ", error);
    throw new Error("Failded to delete services");
  }
};
