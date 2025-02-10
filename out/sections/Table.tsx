import useQuotes from "../hooks/useQuotes.ts";
import { Quote } from "../models/Quote.models.ts";
import "../styles/css/Table.css";
import "../index.css";
import { Check, Loader, Ban, Pencil, Trash, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const TableSection: React.FC = () => {
  const { quotes, loading, error } = useQuotes();
  console.log(quotes);

  function pressOn() {
    console.log("Boton borrar precionado");
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="table-content">
      <Link to="/GenerateQuote">
        <button>
          <span className="icon-text">
            <Plus /> Generar cita
          </span>
        </button>
      </Link>
      <br /> <br />
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tamaño de las uñas</th>
            <th>Servicio</th>
            <th>Diseño</th>
            <th>Precio Total</th>
            <th>Fecha de Creacion</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote: Quote) => (
            <tr>
              <td>{quote.name}</td>
              <td>{quote.size_name}</td>
              <td>{quote.services}</td>
              <td>{quote.designs}</td>
              <td>{quote.total_amount}</td>
              <td>{quote.created_at}</td>
              <td>
                <span
                  className={` ${quote.status === "Completed"
                    ? "checked-status"
                    : quote.status === "Pending"
                      ? "pending-status"
                      : quote.status === "Cancelled"
                        ? "cancelled-status"
                        : "status"
                    } `}
                >
                  {quote.status === "Completed" ? (
                    <Check />
                  ) : quote.status === "Pending" ? (
                    <Loader />
                  ) : quote.status === "Cancelled" ? (
                    <Ban />
                  ) : (
                    ""
                  )}{" "}
                  {quote.status}
                </span>
              </td>
              <td>
                <div className="content-buttons">
                  <button className="edit-button" onClick={pressOn}>
                    <span className="icon-edit">
                      <Pencil /> Editar
                    </span>
                  </button>
                  <button className="delete-button" onClick={pressOn}>
                    <Trash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSection;
