import {
  Ban,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader,
  Pencil,
  Trash,
} from "lucide-react";
import { SkeletonTheme } from "react-loading-skeleton";
import { Button } from "../../../components/common/Button";
import { ModalAlert } from "../../../components/common/ModalAlert";
import { ROUTE_PATHS } from "../../../constants/routes";
import { useModalAlert } from "../../../hooks/useModalAlert";
import { Appointment } from "../../../types/appointment.types";
import { useTableAppointment } from "../hooks/useTableAppointment";
import { LoadingTBody } from "../../../components/common/Table";

export const TableAppointment = () => {
  const {
    appointments,
    loadingLisAppointment,
    deleteAppointment,
    nextPage,
    prevPage,
  } = useTableAppointment();
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
        {loadingLisAppointment ? (
          <>
            {Array.from({ length: 12 }).map((_, index) => (
              <SkeletonTheme key={index}>
                <LoadingTBody count={10} />
              </SkeletonTheme>
            ))}
          </>
        ) : (
          <>
            {appointments.map((appointment: Appointment) => {
              const { className, icon } = statusConfig[
                appointment.status as keyof typeof statusConfig
              ] || {
                className:
                  "flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-800",
                icon: "",
              };
              return (
                <tr
                  key={appointment.appointment_id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{appointment.appointment_id}</td>
                  <td className="px-4 py-3">{appointment.client_name}</td>
                  <td className="px-4 py-3">{appointment.size_name}</td>
                  <td className="px-4 py-3">{appointment.nail_services}</td>
                  <td className="px-4 py-3">{appointment.nail_designs}</td>
                  <td className="px-4 py-3">{appointment.total_amount}</td>
                  <td className="px-4 py-3">{appointment.phone_number}</td>
                  <td className="px-4 py-3">{appointment.created_at}</td>
                  <td className="px-4 py-3">
                    {
                      <span className={className}>
                        {icon} {appointment.status}
                      </span>
                    }
                  </td>
                  <td>
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
                  </td>
                </tr>
              );
            })}
          </>
        )}
      </tbody>
      <tfoot className="bg-gray-50 text-gray-700 uppercase">
        <tr>
          <th className="px-4 py-3" colSpan={9}>
            Pagina
          </th>
          <td className="px-4 py-3">
            <div className="flex justify-center items-center gap-2">
              <button
                className="hover:bg-gray-300 active:bg-gray-200 rounded-full p-2 transition-colors group disabled:bg-transparent"
                onClick={prevPage}
                disabled={true}
              >
                <ChevronLeft className="group-disabled:text-transparent" />
              </button>
              <span className="text-lg">1</span>
              <button
                className="hover:bg-gray-300 active:bg-gray-200 rounded-full p-2 transition-colors group disabled:bg-transparent"
                onClick={nextPage}
                disabled={true}
              >
                <ChevronRight className="group-disabled:text-transparent" />
              </button>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
