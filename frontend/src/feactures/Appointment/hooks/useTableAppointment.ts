import { useCallback, useEffect, useState } from "react";
import { appointmentService } from "../../../api/appointmentService";
import { Appointment } from "../../../types/appointment.types";

import { useAuth } from "../../../contexts/AuthContext/hooks/useAuth";
import { toast } from "react-hot-toast";
import { TOAST_MESSAGE } from "../../../constants/toast";

export const useTableAppointment = () => {
  const [appointments, setAppointment] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const { isAuthenticated, token } = useAuth();

  // hooks
  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };
  const nextPage = () => console.log("Siguente pagina");
  const prevPage = () => console.log("Anterior pagina");

  // Apis
  const listAppointment = useCallback(async () => {
    if (isAuthenticated && token) {
      try {
        const data = await appointmentService.listAppointment(token);
        setAppointment(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Ocurrio un error desconocido.");
        }
      } finally {
        setLoading(false);
      }
    }
  }, [isAuthenticated, token]);

  const deleteAppointment = useCallback(
    async (id: number) => {
      try {
        if (isAuthenticated && token) {
          await toast.promise(appointmentService.deleteAppointment(token, id), {
            success: TOAST_MESSAGE.SUCCESS_DELETE,
            loading: TOAST_MESSAGE.LOADING_DELETE,
            error: TOAST_MESSAGE.ERROR_DELETE,
          });
          listAppointment();
        }
      } catch (error) {
        console.error(error);
      }
    },

    [listAppointment, isAuthenticated, token],
  );

  useEffect(() => {
    listAppointment();
  }, [listAppointment]);

  return {
    expandedRow,
    appointments,
    error,
    loading,
    toggleRow,
    deleteAppointment,
    nextPage,
    prevPage,
    listAppointment,
  };
};
