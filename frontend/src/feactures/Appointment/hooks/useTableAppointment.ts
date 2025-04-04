import { useCallback, useEffect, useState } from "react";
import { appointmentService } from "../../../api/appointmentService";
import { Appointment } from "../../../types/appointment.types";

import { toast } from "react-toastify/unstyled";
import { useAuth } from "../../../contexts/AuthContext/hooks/useAuth";

export const useTableAppointment = () => {
  const [appointments, setAppointment] = useState<Appointment[]>([]);
  const [errorListAppointment, setErrorListAppointment] = useState<
    string | null
  >(null);
  const [loadingLisAppointment, setLoadingLisAppointment] =
    useState<boolean>(true);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const { isAuthenticated, token } = useAuth();

  // hooks
  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Apis
  const listAppointment = async () => {
    if (isAuthenticated && token) {
      try {
        const data = await appointmentService.listAppointment(token);
        setAppointment(data);
      } catch (error) {
        console.error(error);
        setErrorListAppointment("Error al listar las citas");
      } finally {
        setLoadingLisAppointment(false);
      }
    }
  };

  const deleteAppointment = useCallback(
    async (id: number) => {
      try {
        if (isAuthenticated && token) {
          await toast.promise(appointmentService.deleteAppointment(token, id), {
            success: "Se elimnio con exito.",
            pending: "Cargando...",
            error: "Error al borrar.",
          });
          listAppointment();
        }
      } catch (error) {
        console.error(error);
      }
    },

    [appointments, isAuthenticated, token],
  );

  useEffect(() => {
    listAppointment();
  }, [isAuthenticated, token]);

  return {
    expandedRow,
    appointments,
    errorListAppointment,
    loadingLisAppointment,
    toggleRow,
    deleteAppointment,
  };
};
