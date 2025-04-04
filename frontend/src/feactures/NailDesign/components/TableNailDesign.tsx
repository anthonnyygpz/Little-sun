import { SkeletonTheme } from "react-loading-skeleton";
import { ErrorCard } from "../../../components/common/Card";
import {
  LoadingTBody,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
} from "../../../components/common/Table";
import { useTableNailDesign } from "../hooks/useTableNailDesign";
import { NailDesign } from "../../../types/nailDesign.types";
import { Button } from "../../../components/common/Button";
import { ROUTE_PATHS } from "../../../constants/routes";
import { Pencil, Trash } from "lucide-react";
import { useModalAlert } from "../../../hooks/useModalAlert";
import { ModalAlert } from "../../../components/common/ModalAlert";

export const TableNailDesign = () => {
  const { nailDesigns, error, loading, deleteNailDesign, listNailDesign } =
    useTableNailDesign();
  const { isOpen, openDialog, closeDialog } = useModalAlert();

  if (error && nailDesigns.length > 0)
    return <ErrorCard onRetry={listNailDesign} />;

  return (
    <Table>
      <Thead>
        <tr>
          <Th>ID</Th>
          <Th>Nombre del diseño</Th>
          <Th>Precio base</Th>
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
        ) : nailDesigns.length === 0 ? (
          <tr>
            <Td colSpan={4} className="text-center py-8 text-gray-500">
              No hay diseño desponibles
            </Td>
          </tr>
        ) : (
          <>
            {nailDesigns.map((nailDesign: NailDesign) => {
              return (
                <tr key={nailDesign.design_id}>
                  <Td>{nailDesign.design_id}</Td>
                  <Td>{nailDesign.design_name}</Td>
                  <Td>{nailDesign.base_price}</Td>

                  <Td>
                    <div className="flex justify-center flex-row gap-2">
                      <Button
                        className="btn-blue flex items-center gap-1 rounded-md px-3 py-1"
                        href={ROUTE_PATHS.UDPATE_NAIL_DESIGN}
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
                        onConfirm={() => deleteNailDesign(nailDesign.design_id)}
                      >
                        <p className="flex gap-1 text-gray-600">
                          ID del diseño de uña:
                          <span className="font-bold">
                            {nailDesign.design_id}
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
