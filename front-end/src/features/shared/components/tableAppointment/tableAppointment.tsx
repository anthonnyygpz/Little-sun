import { encode } from "js-base64";
import { Ban, Check, Loader, Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useAlert } from "./hooks/useAlertDelete.ts";
import { AppointmentService } from "../../../appointment";
import { AppointmentResponse } from "../../types/appointmentTypes.ts";

const TableQuote = () => {
  const { appointments, loading, error } = AppointmentService();
  const { handleAlertDelete } = useAlert();

  const statusConfig = {
    Completed: { className: "checked-status", icon: <Check /> },
    Pending: { className: "pending-status", icon: <Loader /> },
    Cancelled: { className: "cancelled-status", icon: <Ban /> },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-table scroll">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tamaño de las uñas</th>
            <th>Servicio</th>
            <th>Diseño</th>
            <th>Precio Total</th>
            <th>Numero de telefono</th>
            <th>Fecha de Creacion</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment: AppointmentResponse) => {
            const { className, icon } = statusConfig[
              appointment.status as keyof typeof statusConfig
            ] || {
              className: "status",
              icon: "",
            };
            return (
              <tr key={appointment.quote_id}>
                <td>{appointment.name}</td>
                <td>{appointment.size_name}</td>
                <td>{appointment.services}</td>
                <td>{appointment.designs}</td>
                <td>{appointment.total_amount}</td>
                <td>{appointment.phone_number}</td>
                <td>{appointment.created_at}</td>
                <td>
                  <span className={className}>
                    {icon} {appointment.status}
                  </span>
                </td>
                <td>
                  <div className="container-buttons">
                    <Link
                      to={`/UpdateQuote/${encode(JSON.stringify(appointment))}`}
                    >
                      <button className="button-edit">
                        <Pencil />
                        <span>Editar</span>
                      </button>
                    </Link>
                    <button
                      className="delete-button"
                      onClick={() =>
                        handleAlertDelete(
                          Number(appointment.quote_id),
                          `${appointment.name}/ ${appointment.size_name}/ ${appointment.services}/ ${appointment.designs}/ ${appointment.total_amount}`,
                        )
                      }
                    >
                      <Trash />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableQuote;
