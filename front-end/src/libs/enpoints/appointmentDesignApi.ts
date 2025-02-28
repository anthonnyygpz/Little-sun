import { AppointmentDesignCreate } from "../../features/shared/types/appointmentDesignTypes.ts";
import apiClient from "../apiClient.ts";

export const createAppointmentDesign = async (
  newAppointmentDesign: AppointmentDesignCreate,
) => {
  try {
    const response = await apiClient.post(
      "/quote_designs/",
      newAppointmentDesign,
    );
    return response.data;
  } catch {
    throw new Error("Failed to create appointment designs");
  }
};

export const deleteAppointmentDesign = async (id: number) => {
  try {
    const response = await apiClient.delete(
      "/quote_designs/delete?quote_id=" + id,
    );
    return response.data;
  } catch {
    throw new Error("Failed to create appointment designs");
  }
};
