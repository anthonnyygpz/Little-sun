import { encode } from "js-base64";
import { Ban, Check, ChevronRight, Loader, Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useAlert } from "./hooks/useAlertDelete.ts";
import { AppointmentService } from "../../../appointment";
import { AppointmentResponse } from "../../types/appointmentTypes.ts";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

const TableAppointment = () => {
  const { appointments, loading, error } = AppointmentService();
  const { handleAlertDelete } = useAlert();
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // console.log(appointments);
  const statusConfig = {
    Completed: {
      className:
        "flex items-center gap-1 px-2 py-1 rounded-md bg-green-100 text-green-800",
      icon: <Check />,
    },
    Pending: {
      className:
        "flex items-center gap-1 px-2 py-1 rounded-md bg-yellow-100 text-yellow-800",
      icon: <Loader />,
    },
    Cancelled: {
      className:
        "flex items-center gap-1 px-2 py-1 rounded-md bg-red-100 text-red-800",
      icon: <Ban />,
    },
  };

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  if (error)
    return (
      <div className="flex justify-center p-4 text-red-500">Error: {error}</div>
    );

  return (
    <div className="shadow-md overflow-hidden rounded-lg m-3">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 uppercase">
            <tr>
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
          <tbody className="divide-y divide-gray-200">
            {appointments.map((appointment: AppointmentResponse) => {
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
                  <td className="px-4 py-3">
                    {loading ? <Skeleton /> : appointment.client_name}
                  </td>
                  <td className="px-4 py-3">
                    {loading ? <Skeleton /> : appointment.size_name}
                  </td>
                  <td className="px-4 py-3">
                    {loading ? <Skeleton /> : appointment.nail_services}
                  </td>
                  <td className="px-4 py-3">
                    {loading ? <Skeleton /> : appointment.nail_designs}
                  </td>
                  <td className="px-4 py-3">
                    {loading ? <Skeleton /> : appointment.total_amount}
                  </td>
                  <td className="px-4 py-3">
                    {loading ? <Skeleton /> : appointment.phone_number}
                  </td>
                  <td className="px-4 py-3">
                    {loading ? <Skeleton /> : appointment.created_at}
                  </td>
                  <td className="px-4 py-3">
                    {loading ? (
                      <Skeleton />
                    ) : (
                      <span className={className}>
                        {icon} {appointment.status}
                      </span>
                    )}
                  </td>
                  <td>
                    {loading ? (
                      <Skeleton />
                    ) : (
                      <div className="flex spcae-x-2">
                        <Link
                          to={`/UpdateQuote/${encode(JSON.stringify(appointment))}`}
                        >
                          <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                            <Pencil className="w-4 h-4" /> <span>Editar</span>
                          </button>
                        </Link>
                        <button
                          className="flex items-center p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                          onClick={() =>
                            handleAlertDelete(
                              Number(appointment.appointment_id),
                              `${appointment.client_name} / ${appointment.size_name} / ${appointment.nail_services} / ${appointment.nail_designs} / ${appointment.total_amount}`,
                            )
                          }
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* vista de tarjeta para moviles */}
      <div className="md:hidden">
        <ul className="divide-y dive-gray-200">
          {appointments.map((appointment: AppointmentResponse) => {
            const { className, icon } = statusConfig[
              appointment.status as keyof typeof statusConfig
            ] || {
              className:
                "flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-800",
              icon: "",
            };
            const isExpanded =
              expandedRow === Number(appointment.appointment_id);

            return (
              <li key={appointment.appointment_id} className="p-4">
                {loading ? (
                  <Skeleton />
                ) : (
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() =>
                      toggleRow(Number(appointment.appointment_id))
                    }
                  >
                    <div className="font-medium">{appointment.client_name}</div>
                    <div className="flex items-center gap-2">
                      <span className={className}>
                        {icon} {appointment.status}
                      </span>

                      <ChevronRight
                        className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-90" : ""}`}
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
                    <div className={`mt-3 space-y-2 text-sm `}>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-500">Tamaño:</div>
                        <div>
                          {loading ? <Skeleton /> : appointment.size_name}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-500">Servicio:</div>
                        <div>
                          {loading ? <Skeleton /> : appointment.nail_services}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-500">Diseño:</div>
                        <div>
                          {loading ? <Skeleton /> : appointment.nail_designs}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-500">Precio:</div>
                        <div>
                          {loading ? <Skeleton /> : appointment.total_amount}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-500">Telefono:</div>
                        <div>
                          {loading ? <Skeleton /> : appointment.phone_number}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-500">Fecha:</div>
                        <div>
                          {loading ? <Skeleton /> : appointment.created_at}
                        </div>
                      </div>

                      {loading ? (
                        <Skeleton />
                      ) : (
                        <div className="flex space-x-2 pt-2 mt-2 border-t border-gray-100">
                          <Link
                            to={`/UpdateAppointment/${encode(JSON.stringify(appointment))}`}
                            className="flex-1 cursor-pointer w-full flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                          >
                            <Pencil className="w-4 h-4" /> <span>Editar</span>
                          </Link>

                          <button
                            className="flex items-center justify-center p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAlertDelete(
                                Number(appointment.appointment_id),
                                `${appointment.client_name} / ${appointment.size_name} / ${appointment.nail_services} / ${appointment.nail_designs} / ${appointment.total_amount}`,
                              );
                            }}
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TableAppointment;
