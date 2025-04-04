import { ChevronLeft, ChevronRight, Pencil, Trash } from "lucide-react";
import { useTableClient } from "../hooks/useTableClient";
import { SkeletonTheme } from "react-loading-skeleton";
import { LoadingTBody } from "../../../components/common/Table";
import { Client } from "../../../types/client.types";
import { Button } from "../../../components/common/Button";
import { ROUTE_PATHS } from "../../../constants/routes";
import { useModalAlert } from "../../../hooks/useModalAlert";
import { ModalAlert } from "../../../components/common/ModalAlert";

export const TableClient = () => {
  const { listClients, loading, deleteClient } = useTableClient();
  const { openDialog, closeDialog, isOpen } = useModalAlert();

  return (
    <table className="w-full text-left text-sm">
      <thead className="bg-gray-50 text-gray-700 uppercase">
        <tr>
          <th className="px-4 py-3">ID</th>
          <th className="px-4 py-3">Nombre</th>
          <th className="px-4 py-3">Numbero de telefono</th>
          <th className="px-4 py-3">Fecha de creacion</th>
          <th className="px-4 py-3">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-300">
        {loading ? (
          <>
            {Array.from({ length: 12 }).map((_, index) => (
              <SkeletonTheme key={index}>
                <LoadingTBody count={5} />
              </SkeletonTheme>
            ))}
          </>
        ) : (
          <>
            {listClients.map((client: Client) => {
              return (
                <tr className="hover:bg-gray-50" key={client.client_id}>
                  <td className="px-4 py-3">{client.client_id}</td>
                  <td className="px-4 py-3">{client.name}</td>
                  <td className="px-4 py-3">{client.phone_number}</td>
                  <td className="px-4 py-3">{client.created_at}</td>
                  <td className="px-4 py-3">
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
                        onConfirm={() => deleteClient(client.client_id)}
                      >
                        <p className="flex gap-1 text-gray-600">
                          ID de la cita:
                          <span className="font-bold">{client.client_id}</span>
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
          <th className="px-4 py-3" colSpan={4}>
            Pagina
          </th>
          <td className="px-4 py-3">
            <div className="flex justify-center items-center gap-2">
              <button
                className="hover:bg-gray-300 active:bg-gray-200 rounded-full p-2 transition-colors group disabled:bg-transparent"
                disabled={true}
              >
                <ChevronLeft className="group-disabled:text-transparent" />
              </button>
              <span className="text-lg">1</span>
              <button
                className="hover:bg-gray-300 active:bg-gray-200 rounded-full p-2 transition-colors group disabled:bg-transparent"
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
