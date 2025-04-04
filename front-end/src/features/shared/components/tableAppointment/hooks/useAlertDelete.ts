import Swal from "sweetalert2";
import { AppointmentService } from "../../../../appointment";

export const useAlert = () => {
  const { deleteAppointment, getAllAppointments } = AppointmentService();

  const handleAlertDelete = async (
    appointment_id: number,
    nameText: string,
  ) => {
    Swal.fire({
      icon: "warning",
      title: `Desea eliminar los siguientes datos de la tabla?`,
      html: `<p>${nameText}</p>`,
      showCancelButton: true,
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await deleteAppointment(appointment_id);
          await getAllAppointments();
          Swal.fire(
            "¡Exito!",
            "Los datos fueron borrados con exito",
            "success",
          );
        }
      } catch {
        Swal.fire(
          "¡Error!",
          "A surgido un error inesperado intentelo mas tarde.",
          "error",
        );
      }
    });
  };

  return { handleAlertDelete };
};
