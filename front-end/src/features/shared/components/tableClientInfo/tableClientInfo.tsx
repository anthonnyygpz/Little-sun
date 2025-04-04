import { Link } from "react-router-dom";
import { ClientService } from "../../../client/";
import { ClientResponse } from "../../types/clientTypes.ts";
import { ChevronRight, Pencil, Trash } from "lucide-react";
import Swal from "sweetalert2";
import { encode } from "js-base64";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";

const TableClientsInfo: React.FC = () => {
  const {
    clientAll,
    deleteClients,
    getAllClients,
    loadingClientAll,
    errorClientAll,
  } = ClientService();

  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const handleAlertDelete = async (client_id: number, nameText: string) => {
    Swal.fire({
      icon: "warning",
      title: `Desea eliminar los siguientes datos de la tabla?`,
      html: `<p>${nameText}</p>`,
      showCancelButton: true,
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await deleteClients(client_id);
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

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  if (errorClientAll) return <div>Error: {errorClientAll}</div>;

  return (
    <div className="shadow-md overflow-hidden rounded-lg m-3">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3">Nombre del cliente</th>
              <th className="px-4 py-3">Telefono del cliente</th>
              <th className="px-4 py-3">Fecha de creacion</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clientAll?.map((client: ClientResponse) => (
              <tr className="hover:bg-gray-50" key={client.client_id}>
                <td className="px-4 py-3">
                  {loadingClientAll ? <Skeleton /> : client.name}
                </td>
                <td>{loadingClientAll ? <Skeleton /> : client.phone_number}</td>
                <td>{loadingClientAll ? <Skeleton /> : client.created_at}</td>
                <td>
                  {loadingClientAll ? (
                    <Skeleton />
                  ) : (
                    <div className="flex flex-row gap-2">
                      <Link
                        to={`/Clients/UpdateClient/${encode(JSON.stringify(client))}`}
                      >
                        <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md  transition-colors">
                          <Pencil className="w-4 h-4" />
                          <span>Editar</span>
                        </button>
                      </Link>
                      <button
                        className="flex items-center ga-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                        onClick={() =>
                          handleAlertDelete(
                            client.client_id,
                            `${client.name}/ ${client.phone_number}`,
                          )
                        }
                      >
                        <Trash />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* vista de tarjeta para moviles */}
      <div className="md:hidden">
        <ul className="divide-y dive-gray-200">
          {clientAll?.map((client: ClientResponse) => {
            const isExpanded = expandedRow === Number(client.client_id);
            return (
              <li key={client.client_id} className="p-4">
                {loadingClientAll ? (
                  <Skeleton />
                ) : (
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleRow(Number(client.client_id))}
                  >
                    <div className="font-medium">{client.name}</div>
                    <div className="flex items-center gap-2">
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
                        <div className="text-gray-500">Nombre:</div>
                        <div>
                          {loadingClientAll ? <Skeleton /> : client.name}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-500">Numero de telefono:</div>
                        <div>
                          {loadingClientAll ? (
                            <Skeleton />
                          ) : (
                            client.phone_number
                          )}
                        </div>
                      </div>

                      {loadingClientAll ? (
                        <Skeleton />
                      ) : (
                        <div className="flex space-x-2 pt-2 mt-2 border-t border-gray-100">
                          <Link
                            to={`/Clients/UpdateClient/${encode(JSON.stringify(client))}`}
                            className="flex-1"
                          >
                            <button className="w-full flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                              <Pencil className="w-4 h-4" /> Editar
                            </button>
                          </Link>

                          <button
                            className="flex items-center justify-center p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAlertDelete(
                                Number(client.client_id),
                                `${client.name} / ${client.phone_number}`,
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

export default TableClientsInfo;
