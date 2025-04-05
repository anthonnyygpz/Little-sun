import { Pencil, Trash } from "lucide-react";
import { Button } from "../../../components/common/Button";
import { ModalAlert } from "../../../components/common/ModalAlert";
import {
  LoadingTbody,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
} from "../../../components/common/Table";
import { ROUTE_PATHS } from "../../../constants/routes";
import { useModalAlert } from "../../../hooks/useModalAlert";
import { Client } from "../../../types/client.types";
import { useTableClient } from "../hooks/useTableClient";

export const TableClient = () => {
  const { listClients, loading, deleteClient } = useTableClient();
  const { openDialog, closeDialog, isOpen } = useModalAlert();

  return (
    <Table>
      <Thead>
        <tr>
          <Th>ID</Th>
          <Th>Nombre</Th>
          <Th>Numbero de telefono</Th>
          <Th>Fecha de creacion</Th>
          <Th>Acciones</Th>
        </tr>
      </Thead>
      <Tbody>
        {loading ? (
          <LoadingTbody count={5} />
        ) : listClients.length === 0 ? (
          <tr>
            <Td colSpan={4} className="text-center py-8 text-gray-500">
              No hay servicios desponibles
            </Td>
          </tr>
        ) : (
          <>
            {listClients.map((client: Client) => {
              return (
                <tr className="hover:bg-gray-50" key={client.client_id}>
                  <Td>{client.client_id}</Td>
                  <Td>{client.name}</Td>
                  <Td>{client.phone_number}</Td>
                  <Td>{client.created_at}</Td>
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
                        onConfirm={() => deleteClient(client.client_id)}
                      >
                        <p className="flex gap-1 text-gray-600">
                          ID de la cita:
                          <span className="font-bold">{client.client_id}</span>
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
      <Tfoot colSpan={4} />
    </Table>
  );
};
