import axios, { AxiosError } from "axios";
import { API_CONFIG } from "../constants/api";
import { Appointment, CreateAppointment } from "../types/appointment.types";
import { apiService } from "./apiService";

export const appointmentService = {
  createAppointment: async (
    token: string,
    newAppointment: CreateAppointment,
  ) => {
    try {
      const response = await apiService.post(
        API_CONFIG.ENDPOINTS.APPOINTMENTS,
        newAppointment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error to create apppointment", error);
      return Promise.reject(
        error instanceof AxiosError
          ? new Error(error.response?.data?.message || "Error de red")
          : new Error("Error desconocido"),
      );
    }
  },
  listAppointment: async (token: string): Promise<Appointment[]> => {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.APPOINTMENTS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      let errorMessage =
        "Error al obtener la lista citas. Por favor intente nuevamente.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.detail;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      console.error("Error to list appopintments: ", error);
      throw new Error(errorMessage);
    }
  },
  deleteAppointment: async (token: string, id: number) => {
    try {
      const response = await apiService.delete(
        API_CONFIG.ENDPOINTS.APPOINTMENTS + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error delete appointment: ", error);
      throw new Error("Failed to delete appointment");
    }
  },
};
