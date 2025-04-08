import {
  LoadingTbody,
  Table,
  Tbody,
  Td,
  TdActions,
  Tfoot,
  Th,
  Thead,
} from "../../../components/common/Table";
import { ROUTE_PATHS } from "../../../constants/routes";
import { useModalAlert } from "../../../hooks/useModalAlert";
import { SculpingNailSize } from "../../../types/sculpingNailSize.types";
import { useTableSculpingNailSize } from "../hooks/useTableSculpingNailSize";
import { ModalAlert } from "../../../components/common/ModalAlert";
import { ErrorCard } from "../../../components/common/Card";

export const TableSculpingNailSize = () => {
  const {
    sculpingNailSizes,
    loading,
    error,
    deleteSculpingNailSize,
    listSculpingNailSize,
  } = useTableSculpingNailSize();
  const { isOpen, openDialog, closeDialog } = useModalAlert();

  if (error) return <ErrorCard onRetry={listSculpingNailSize} />;

  return (
    <Table>
      <Thead>
        <tr>
          <Th>ID</Th>
          <Th>Nombre del esculpido</Th>
          <Th>Precio base</Th>
        </tr>
      </Thead>
      <Tbody>
        {loading ? (
          <LoadingTbody count={3} />
        ) : sculpingNailSizes.length === 0 ? (
          <tr>
            <Td colSpan={3} className="text-center py-8 text-gray-500">
              No hay esculpidos disponibles.
            </Td>
          </tr>
        ) : (
          <>
            {sculpingNailSizes.map((sculping: SculpingNailSize) => {
              return (
                <tr key={sculping.size_id}>
                  <Td>{sculping.size_id}</Td>
                  <Td>{sculping.size_name}</Td>
                  <Td>{sculping.base_price}</Td>

                  <TdActions
                    openDialog={openDialog}
                    editRoute={ROUTE_PATHS.UPDATE_SCULPING}
                  />

                  <ModalAlert
                    isOpen={isOpen}
                    onClose={closeDialog}
                    title="¿Deseas eliminar este dato?"
                    onConfirm={() => deleteSculpingNailSize(sculping.size_id)}
                  >
                    <p className="flex gap-1 text-gray-600">
                      ID del tamaño del esculpido:
                      <span className="font-bold">{sculping.size_id}</span>
                    </p>
                  </ModalAlert>
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
