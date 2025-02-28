import { useEffect, useState } from "react";
import {
  createAppointmentApi,
  getAllAppointmentApi,
  updateAppointmentApi,
  deleteAppointmentApi,
  deleteNailSizeApi,
} from "../../../libs/enpoints/appointmentApi.ts";
import {
  AppointmentCreate,
  AppointmentResponse,
  AppintmentUpdate,
} from "../../shared/types/appointmentTypes.ts";

const AppointmentService = () => {
  const [appointments, setAppointment] = useState<AppointmentResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const addAppointment = async (newAppointment: AppointmentCreate) => {
    try {
      const createdAppointment = await createAppointmentApi(newAppointment);
      sessionStorage.removeItem("appointments");
      getAllAppointments();
      return createdAppointment;
    } catch {
      setError("Failed to create Appointment");
    }
  };

  const getAllAppointments = async () => {
    const cacheSize = sessionStorage.getItem("appointments");
    if (cacheSize) {
      setAppointment(JSON.parse(cacheSize));
      setLoading(false);
    } else {
      const getAppointments = async () => {
        try {
          const data = await getAllAppointmentApi();
          sessionStorage.setItem("Appointments", JSON.stringify(data));
          setAppointment(data);
        } catch {
          setError("Failed to fetch Appointments");
        } finally {
          setLoading(false);
        }
      };

      getAppointments();
    }
  };

  const editAppointment = async (newAppointment: AppintmentUpdate) => {
    try {
      const updatedAppointment = await updateAppointmentApi(newAppointment);
      sessionStorage.removeItem("appointments");
      getAllAppointmentApi();
      return updatedAppointment;
    } catch {
      setError("Failed to create Appointment");
    }
  };

  const deleteAppointment = async (id: number) => {
    try {
      const data = await deleteAppointmentApi(id);
      sessionStorage.removeItem("appointments");
      getAllAppointmentApi();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNailSize = async (id: number) => {
    try {
      const data = await deleteNailSizeApi(id);
      sessionStorage.removeItem("appointments");
      getAllAppointmentApi();
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
    addAppointment: addAppointment,
    getAllAppointments,
    editAppointment,
    deleteNailSize,
    deleteAppointment,
  };
};

export default AppointmentService;
