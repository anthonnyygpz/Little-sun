import { useCallback, useEffect, useState } from "react";
import { appointmentService } from "../../../api/appointmentService";
import { Appointment } from "../../../types/appointment.types";

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
  const nextPage = () => console.log("Siguente pagina");
  const prevPage = () => console.log("Anterior pagina");

  // Apis
  const listAppointment = useCallback(async () => {
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
  }, [isAuthenticated, token]);

  const deleteAppointment = useCallback(
    async (id: number) => {
      try {
        if (isAuthenticated && token) {
          // await toast.promise(appointmentService.deleteAppointment(token, id), {
          //   success: "Se elimnio con exito.",
          //   pending: "Cargando...",
          //   error: "Error al borrar.",
          // });
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
    errorListAppointment,
    loadingLisAppointment,
    toggleRow,
    deleteAppointment,
    nextPage,
    prevPage,
    listAppointment,
  };
};
