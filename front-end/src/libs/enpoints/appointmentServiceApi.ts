import { AppointmentServiceCreate } from "../../features/shared/types/appointmentServiceTypes.ts";
import apiClient from "../apiClient.ts";

export const createAppointmentService = async (
  appointmentService: AppointmentServiceCreate,
) => {
  try {
    const response = await apiClient.post(
      "/quote_services/",
      appointmentService,
    );
    return response.data;
  } catch {
    throw new Error("Failed to create appointment services");
  }
};

export const deleteAppointmentService = async (id: number) => {
  try {
    const response = await apiClient.delete(
      "/quote_services/delete?quote_id=" + id,
    );
    return response.data;
  } catch {
    throw new Error("Failed to create appointment services");
  }
};
