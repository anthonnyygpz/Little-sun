import Skeleton from "react-loading-skeleton";
import { Appointment } from "../../../types/appointment.types";
import { useTableAppointment } from "../hooks/useTableAppointment";
import { Pencil, Trash } from "lucide-react";
import { ROUTE_PATHS } from "../../../constants/routes";
import { Button } from "../../../components/common/Button";
import { useModalAlert } from "../../../hooks/useModalAlert";
import { ModalAlert } from "../../../components/common/ModalAlert";
import { Ban, Check, Loader } from "lucide-react";
import { ToastContainer } from "react-toastify/unstyled";

export const TableAppointment = () => {
  const { appointments, loadingLisAppointment, deleteAppointment } =
    useTableAppointment();
  const { openDialog, closeDialog, isOpen } = useModalAlert();

  const statusConfig = {
    Completed: {
      className:
        "flex items-center gap0 px-2 py-1 rounded-md bg-green-100 text-green-800",
      icon: <Check />,
    },
    Pending: {
      className:
        "flex items-center gap0 px-2 py-1 rounded-md bg-yellow-100 text-yellow-800",
      icon: <Loader />,
    },
    Cancelled: {
      className:
        "flex items-center gap0 px-2 py-1 rounded-md bg-red-100 text-red-800",
      icon: <Ban />,
    },
  };

  return (
    <table className="w-full text-left text-sm">
      <thead className="bg-gray-50 text-gray-700 uppercase">
        <tr>
          <th className="px-4 py-3">ID</th>
          <th className="px-4 py-3">Nombre</th>
          <th className="px-4 py-3">Tamaño de las uñas</th>
          <th className="px-4 py-3">Servicio</th>
          <th className="px-4 py-3">Diseño</th>
          <th className="px-4 py-3">Precio Total</th>
          <th className="px-4 py-3">Numero de telefono</th>
          <th className="px-4 py-3">Fecha de Creacion</th>
          <th className="px-4 py-3">Estatus</th>
          <th className="px-4 py-3">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-300">
        {appointments.map((appointment: Appointment) => {
          const { className, icon } = statusConfig[
            appointment.status as keyof typeof statusConfig
          ] || {
            className:
              "flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-800",
            icon: "",
          };
          return (
            <tr key={appointment.appointment_id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                {loadingLisAppointment ? (
                  <Skeleton />
                ) : (
                  appointment.appointment_id
                )}
              </td>
              <td className="px-4 py-3">
                {loadingLisAppointment ? <Skeleton /> : appointment.client_name}
              </td>
              <td className="px-4 py-3">
                {loadingLisAppointment ? <Skeleton /> : appointment.size_name}
              </td>
              <td className="px-4 py-3">
                {loadingLisAppointment ? (
                  <Skeleton />
                ) : (
                  appointment.nail_services
                )}
              </td>
              <td className="px-4 py-3">
                {loadingLisAppointment ? (
                  <Skeleton />
                ) : (
                  appointment.nail_designs
                )}
              </td>
              <td className="px-4 py-3">
                {loadingLisAppointment ? (
                  <Skeleton />
                ) : (
                  appointment.total_amount
                )}
              </td>
              <td className="px-4 py-3">
                {loadingLisAppointment ? (
                  <Skeleton />
                ) : (
                  appointment.phone_number
                )}
              </td>
              <td className="px-4 py-3">
                {loadingLisAppointment ? <Skeleton /> : appointment.created_at}
              </td>
              <td className="px-4 py-3">
                {loadingLisAppointment ? (
                  <Skeleton />
                ) : (
                  <span className={className}>
                    {icon} {appointment.status}
                  </span>
                )}
              </td>
              <td>
                {loadingLisAppointment ? (
                  <Skeleton />
                ) : (
                  <div className="flex flex-row gap-2">
                    <Button
                      className="btn-blue flex items-center gap-1 rounded-md px-3 py-1"
                      href={ROUTE_PATHS.UPDATE_APPOINTMENT}
                    >
                      <Pencil className="h-4 w-4" />
                      <span>Editar</span>
                    </Button>
                    <Button
                      className="btn-red flex items-center rounded-md p-2"
                      onClick={() => openDialog()}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>

                    <ModalAlert
                      isOpen={isOpen}
                      onClose={closeDialog}
                      title="¿Deseas eliminar esta cita?"
                      onConfirm={() =>
                        deleteAppointment(appointment.appointment_id)
                      }
                    >
                      <p className="flex gap-1 text-gray-600">
                        ID de la cita:
                        <span className="font-bold">
                          {appointment.appointment_id}
                        </span>
                      </p>
                    </ModalAlert>
                  </div>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
      <ToastContainer />
    </table>
  );
};
