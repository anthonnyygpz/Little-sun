import apiClient from "../apiClient.ts"; // Importa la instancia de axios configurada
import {
  AppointmentCreate,
  AppointmentResponse,
  AppintmentUpdate,
} from "../../features/shared/types/appointmentTypes.ts";

// Función para obtener los quotes (GET)
export const getAllAppointmentApi = async (): Promise<
  AppointmentResponse[]
> => {
  try {
    const response = await apiClient.get<AppointmentResponse[]>("/quotes/all"); // Asegúrate de que la ruta sea correcta
    return response.data;
  } catch (error) {
    console.error("Error fetching quotes:", error);
    throw new Error("Failed to fetch quotes");
  }
};

// Función para crear un nuevo quote (POST)
export const createAppointmentApi = async (
  quote: AppointmentCreate,
): Promise<AppointmentResponse> => {
  try {
    const response = await apiClient.post("/quotes/create", quote); // Asegúrate de que la ruta sea correcta
    return response.data;
  } catch (error) {
    console.error("Error creating quote:", error);
    throw new Error("Failed to create quote");
  }
};

export const updateAppointmentApi = async (quote: AppintmentUpdate) => {
  try {
    const response = await apiClient.put("/quotes/update", quote);
    return response.data;
  } catch (error) {
    console.error("Error creating quote:", error);
    throw new Error("Failed to create quote");
  }
};

export const deleteAppointmentApi = async (id: number) => {
  try {
    const response = await apiClient.delete("/quotes/delete?quote_id=" + id);
    return response.data;
  } catch {
    throw new Error("Failded to fetch quotes");
  }
};

export const deleteNailSizeApi = async (id: number) => {
  try {
    const response = await apiClient.put(
      "/quotes/delete_sculping?quote_id=" + id,
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting quote:", error);
    throw new Error("Failed to delete quote");
  }
};
