import useQuotes from "../hooks/useQuotes.ts";
import { Quote } from "../models/Quote.models.ts";
import "../styles/css/Table.css";
import "../index.css";
import { Check, Loader, Ban, Pencil, Trash, Plus, User } from "lucide-react";
import { Link } from "react-router-dom";
import { encode } from 'js-base64';
import { deleteQuote } from "../api/enpoints/quoteApi.ts";
import Swal from "sweetalert2";

const TableSection: React.FC = () => {
  const { quotes, loading, error, getQuotes } = useQuotes();


  const handleAlertDelete = async (quote_id: number, nameText: string) => {
    Swal.fire({
      icon: "warning",
      title: `Desea eliminar los siguientes datos de la tabla?`,
      html: `<p>${nameText}</p>`,
      showCancelButton: true,
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await deleteQuote(quote_id);
          getQuotes()
          Swal.fire(
            '¡Exito!',
            'Los datos fueron borrados con exito',
            'success'
          );
        }
      } catch {
        Swal.fire(
          '¡Error!',
          'A surgido un error inesperado intentelo mas tarde.',
          'error'
        );
      }
    });
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div className="table-content">
      <div className="content-buttons">
        <Link to="/GenerateQuote">
          <button>
            <span className="icon-text">
              <Plus /> Generar cita
            </span>
          </button>
        </Link>

        <Link to="/Clients">
          <button>
            <span className="icon-text">
              <User />  Clientes
            </span>
          </button>
        </Link>

      </div>
      <br /> <br />
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
          {quotes.map((quote: Quote) => (
            <tr>
              <td>{quote.name}</td>
              <td>{quote.size_name}</td>
              <td>{quote.services}</td>
              <td>{quote.designs}</td>
              <td>{quote.total_amount}</td>
              <td>{quote.phone_number}</td>
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
                  <Link to={`/UpdateQuote/${encode(JSON.stringify(quote))}`}>
                    <button className="edit-button" >
                      <span className="icon-edit">
                        <Pencil /> Editar
                      </span>
                    </button>
                  </Link>
                  <button className="delete-button" onClick={() =>

                    handleAlertDelete(quote.quote_id,
                      `${quote.name}/ ${quote.size_name}/ ${quote.services}/ ${quote.designs}/ ${quote.total_amount}`
                    )}>
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
