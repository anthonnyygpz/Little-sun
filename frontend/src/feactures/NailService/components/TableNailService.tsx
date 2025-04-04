import { SkeletonTheme } from "react-loading-skeleton";
import {
  LoadingTBody,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
} from "../../../components/common/Table";
import { ROUTE_PATHS } from "../../../constants/routes";
import { NailService } from "../../../types/nailService.types";
import { useTableNailService } from "../hooks/useTableNailService";
import { ErrorCard } from "../../../components/common/Card";
import { ModalAlert } from "../../../components/common/ModalAlert";
import { useModalAlert } from "../../../hooks/useModalAlert";
import { Button } from "../../../components/common/Button";
import { Pencil, Trash } from "lucide-react";

export const TableNailService = () => {
  const { nailServices, error, loading, deleteNailService, listNailService } =
    useTableNailService();
  const { isOpen, openDialog, closeDialog } = useModalAlert();

  console.log(error);

  if (error && nailServices.length > 0)
    return <ErrorCard onRetry={listNailService} />;

  return (
    <Table>
      <Thead>
        <tr>
          <Th>ID</Th>
          <Th>Nombre del servicio</Th>
          <Th>Precio Base</Th>
          <Th>Acciones</Th>
        </tr>
      </Thead>
      <Tbody>
        {loading ? (
          <>
            {Array.from({ length: 12 }).map((_, index) => (
              <SkeletonTheme key={index}>
                <LoadingTBody count={4} />
              </SkeletonTheme>
            ))}
          </>
        ) : nailServices.length === 0 ? (
          <tr>
            <Td colSpan={4} className="text-center py-8 text-gray-500">
              No hay servicios desponibles
            </Td>
          </tr>
        ) : (
          <>
            {nailServices.map((nailService: NailService) => {
              return (
                <tr key={nailService.service_id} className="hover:bg-gray-50">
                  <Td>{nailService.service_id}</Td>
                  <Td>{nailService.service_name}</Td>
                  <Td>{nailService.base_price}</Td>
                  <Td>
                    <div className="flex justify-center flex-row gap-2">
                      <Button
                        className="btn-blue flex items-center gap-1 rounded-md px-3 py-1"
                        href={ROUTE_PATHS.UDPATE_NAIL_SERVICE}
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
                        title="¿Deseas eliminar este dato?"
                        onConfirm={() =>
                          deleteNailService(nailService.service_id)
                        }
                      >
                        <p className="flex gap-1 text-gray-600">
                          ID del servicio de uña:
                          <span className="font-bold">
                            {nailService.service_id}
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
      <Tfoot colSpan={3} />
    </Table>
  );
};
