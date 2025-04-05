import { Ban, Check, Loader, Pencil, Trash } from "lucide-react";
import { Button } from "../../../components/common/Button";
import { ModalAlert } from "../../../components/common/ModalAlert";
import { ROUTE_PATHS } from "../../../constants/routes";
import { useModalAlert } from "../../../hooks/useModalAlert";
import { Appointment } from "../../../types/appointment.types";
import { useTableAppointment } from "../hooks/useTableAppointment";
import {
  LoadingTbody,
  Table,
  Tbody,
  Tfoot,
  Th,
  Thead,
} from "../../../components/common/Table";
import { ErrorCard } from "../../../components/common/Card";
import { Td } from "../../../components/common/Table";

export const TableAppointment = () => {
  const {
    appointments,
    loadingLisAppointment,
    errorListAppointment,
    deleteAppointment,
    nextPage,
    prevPage,
    listAppointment,
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

  if (errorListAppointment && appointments.length > 0)
    return <ErrorCard onRetry={listAppointment} />;
  return (
    <Table>
      <Thead>
        <tr>
          <Th className="px-4 py-3">ID</Th>
          <Th className="px-4 py-3">Nombre</Th>
          <Th className="px-4 py-3">Tamaño de las uñas</Th>
          <Th className="px-4 py-3">Servicio</Th>
          <Th className="px-4 py-3">Diseño</Th>
          <Th className="px-4 py-3">Precio Total</Th>
          <Th className="px-4 py-3">Numero de telefono</Th>
          <Th className="px-4 py-3">Fecha de Creacion</Th>
          <Th className="px-4 py-3">Estatus</Th>
          <Th className="px-4 py-3">Acciones</Th>
        </tr>
      </Thead>
      <Tbody>
        {loadingLisAppointment ? (
          <LoadingTbody count={10} />
        ) : appointments.length === 0 ? (
          <tr>
            <Td colSpan={10} className="text-center py-8 text-gray-500">
              No hay citas disponibles
            </Td>
          </tr>
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
                  <Td>{appointment.appointment_id}</Td>
                  <Td>{appointment.client_name}</Td>
                  <Td>{appointment.size_name}</Td>
                  <Td>{appointment.nail_services}</Td>
                  <Td>{appointment.nail_designs}</Td>
                  <Td>{appointment.total_amount}</Td>
                  <Td>{appointment.phone_number}</Td>
                  <Td>{appointment.created_at}</Td>
                  <Td>
                    {
                      <span className={className}>
                        {icon} {appointment.status}
                      </span>
                    }
                  </Td>
                  <Td>
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
                  </Td>
                </tr>
              );
            })}
          </>
        )}
      </Tbody>
      <Tfoot nextPage={nextPage} prevPage={prevPage} colSpan={9} />
    </Table>
  );
};
