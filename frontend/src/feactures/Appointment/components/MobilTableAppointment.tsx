import { Ban, Check, ChevronRight, Loader, Pencil, Trash } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ModalAlert } from "../../../components/common/ModalAlert";
import { ROUTE_PATHS } from "../../../constants/routes";
import { useModalAlert } from "../../../hooks/useModalAlert";
import { Appointment } from "../../../types/appointment.types";
import { useTableAppointment } from "../hooks/useTableAppointment";

export const MobilTableAppointment = () => {
  const {
    appointments,
    loadingLisAppointment,
    expandedRow,
    toggleRow,
    deleteAppointment,
  } = useTableAppointment();
  const { isOpen, openDialog, closeDialog } = useModalAlert();

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
  console.log(appointments);

  return (
    <div className="md:hidden">
      <ul className="divide-y divide-gray-200">
        {appointments.map((appointment: Appointment) => {
          const { className, icon } = statusConfig[
            appointment.status as keyof typeof statusConfig
          ] || {
            className:
              "flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-gray-800",
            icon: "",
          };
          const isExpanded = expandedRow === Number(appointment.appointment_id);

          return (
            <li key={appointment.appointment_id} className="p-4">
              {loadingLisAppointment ? (
                <Skeleton />
              ) : (
                <div
                  className="flex cursor-pointer items-center justify-between"
                  onClick={() => toggleRow(Number(appointment.appointment_id))}
                >
                  <div className="font-medium">{appointment.client_name}</div>

                  <div className="flex items-center gap-2">
                    <div className={`${className} gap-1`}>
                      {icon} <span>{appointment.status}</span>
                    </div>
                    <ChevronRight
                      className={`${isExpanded ? "rotate-90" : ""} h-5 w-5 transition-transform`}
                    />
                  </div>
                </div>
              )}

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {isExpanded && (
                  <div className="mt-3 flex flex-col gap-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-gray-500">ID:</div>
                      <div>
                        {loadingLisAppointment ? (
                          <Skeleton />
                        ) : (
                          appointment.appointment_id
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-gray-500">Tamaño:</div>
                      <div>
                        {loadingLisAppointment ? (
                          <Skeleton />
                        ) : (
                          appointment.size_name
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-gray-500">Servicio:</div>
                      <div>
                        {loadingLisAppointment ? (
                          <Skeleton />
                        ) : (
                          appointment.nail_services
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-gray-500">Diseño:</div>
                      <div>
                        {loadingLisAppointment ? (
                          <Skeleton />
                        ) : (
                          appointment.nail_designs
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-gray-500">Precio:</div>
                      <div>
                        {loadingLisAppointment ? (
                          <Skeleton />
                        ) : (
                          appointment.total_amount
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-gray-500">Telefono:</div>
                      <div>
                        {loadingLisAppointment ? (
                          <Skeleton />
                        ) : (
                          appointment.phone_number
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-gray-500">Fecha:</div>
                      <div>
                        {loadingLisAppointment ? (
                          <Skeleton />
                        ) : (
                          appointment.created_at
                        )}
                      </div>
                    </div>

                    {loadingLisAppointment ? (
                      <Skeleton />
                    ) : (
                      <div className="mt-2 flex space-x-2 border-t border-gray-100 pt-2">
                        <Link
                          to={ROUTE_PATHS.UPDATE_APPOINTMENT}
                          className="flex w-full flex-1 cursor-pointer items-center justify-center gap-1 rounded-md bg-blue-500 px-3 py-2 text-white transition-colors hover:bg-blue-600"
                        >
                          <Pencil className="h-4 w-4" /> <span>Editar</span>
                        </Link>

                        <button
                          className="flex cursor-pointer items-center justify-center rounded-md p-2 btn-red"
                          onClick={() => openDialog()}
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                        <ToastContainer />
                      </div>
                    )}

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
              </div>
            </li>
          );
        })}
      </ul>
      <ToastContainer />
    </div>
  );
};
