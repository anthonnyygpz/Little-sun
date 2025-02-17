import useQuoteApi from "../hooks/useQuoteApi.ts";
import { QuoteResponse } from "../models/Quote.models.ts";
import { Check, Loader, Ban, Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { encode } from "js-base64";
import { useAlert } from "../hooks/useAlertDelete.ts";

const TableQuote = () => {
  const { quotes, loading, error } = useQuoteApi();
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
          {quotes.map((quote: QuoteResponse) => {
            const { className, icon } = statusConfig[quote.status] || {
              className: "status",
              icon: "",
            };
            return (
              <tr key={quote.quote_id}>
                <td>{quote.name}</td>
                <td>{quote.size_name}</td>
                <td>{quote.services}</td>
                <td>{quote.designs}</td>
                <td>{quote.total_amount}</td>
                <td>{quote.phone_number}</td>
                <td>{quote.created_at}</td>
                <td>
                  <span className={className}>
                    {icon} {quote.status}
                  </span>
                </td>
                <td>
                  <div className="container-buttons">
                    <Link to={`/UpdateQuote/${encode(JSON.stringify(quote))}`}>
                      <button className="button-edit">
                        <span>
                          <Pencil /> Editar
                        </span>
                      </button>
                    </Link>
                    <button
                      className="delete-button"
                      onClick={() =>
                        handleAlertDelete(
                          Number(quote.quote_id),
                          `${quote.name}/ ${quote.size_name}/ ${quote.services}/ ${quote.designs}/ ${quote.total_amount}`,
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
