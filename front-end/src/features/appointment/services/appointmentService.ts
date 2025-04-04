import { cache, useEffect, useState } from "react";
import {
  createAppointmentApi,
  getAllAppointmentApi,
  updateAppointmentApi,
  deleteAppointmentApi,
  deleteNailSizeApi,
} from "../../../lib/enpoints/appointmentApi.ts";
import {
  AppointmentCreate,
  AppointmentResponse,
  AppintmentUpdate,
} from "../../shared/types/appointmentTypes.ts";
import LocalStorageItem from "../../shared/constants/localStorage.ts";

const AppointmentService = () => {
  const [appointments, setAppointment] = useState<AppointmentResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { CLIENT_CACHE, APPOINTMENT_CACHE } = LocalStorageItem();

  const addAppointment = async (newAppointment: AppointmentCreate) => {
    try {
      const createdAppointment = await createAppointmentApi(newAppointment);
      localStorage.removeItem(APPOINTMENT_CACHE);
      localStorage.removeItem(CLIENT_CACHE);
      getAllAppointments();
      return createdAppointment;
    } catch {
      setError("Failed to create Appointment");
    }
  };

  const getAllAppointments = async () => {
    try {
      const cacheData = localStorage.getItem(APPOINTMENT_CACHE);
      const now = Date.now();

      if (cacheData) {
        const { data, timestamp } = JSON.parse(cacheData);

        if (now - timestamp < 5 * 60 * 1000) {
          setAppointment(data);
          return;
        }
      }

      const freshData = await getAllAppointmentApi();
      setAppointment(freshData);
      try {
        const cacheEntry = JSON.stringify({
          data: freshData,
          timestamp: now,
        });
        localStorage.setItem(APPOINTMENT_CACHE, cacheEntry);
      } catch (cacheError) {
        console.error("Error al guardar en cache: ", cacheError);
      }
    } catch (error) {
      setError("Failed to fetch clients");
      console.error(error);

      try {
        const cacheData = localStorage.getItem(APPOINTMENT_CACHE);
        if (cacheData) {
          const { data } = JSON.parse(cacheData);
          setAppointment(data);
          setError("Using cached data (connection issue)");
        }
      } catch (fallbackError) {
        console.error("Fallback cache failded: ", fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  const editAppointment = async (newAppointment: AppintmentUpdate) => {
    try {
      const updatedAppointment = await updateAppointmentApi(newAppointment);
      localStorage.removeItem(APPOINTMENT_CACHE);
      getAllAppointments();
      return updatedAppointment;
    } catch {
      setError("Failed to create Appointment");
    }
  };

  const deleteAppointment = async (id: number) => {
    try {
      const data = await deleteAppointmentApi(id);
      localStorage.removeItem(APPOINTMENT_CACHE);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNailSize = async (id: number) => {
    try {
      const data = await deleteNailSizeApi(id);
      localStorage.removeItem(APPOINTMENT_CACHE);
      getAllAppointments();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAppointments();
  }, []);

  return {
    appointments,
    loading,
    error,
    addAppointment,
    getAllAppointments,
    editAppointment,
    deleteNailSize,
    deleteAppointment,
  };
};

export default AppointmentService;
