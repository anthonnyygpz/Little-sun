import { ErrorCard } from "../../../components/common/Card";
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
import { useTableNailDesign } from "../hooks/useTableNailDesign";
import { NailDesign } from "../../../types/nailDesign.types";
import { ROUTE_PATHS } from "../../../constants/routes";
import { useModalAlert } from "../../../hooks/useModalAlert";
import { ModalAlert } from "../../../components/common/ModalAlert";

export const TableNailDesign = () => {
  const { nailDesigns, error, loading, deleteNailDesign, listNailDesign } =
    useTableNailDesign();
  const { isOpen, openDialog, closeDialog } = useModalAlert();

  if (error && nailDesigns.length !== 0)
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
          <LoadingTbody count={4} />
        ) : nailDesigns.length === 0 ? (
          <tr>
            <Td colSpan={4} className="text-center py-8 text-gray-500">
              No hay diseños desponibles.
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
                  <TdActions
                    openDialog={openDialog}
                    editRoute={ROUTE_PATHS.UDPATE_NAIL_DESIGN}
                  />
                  <ModalAlert
                    isOpen={isOpen}
                    onClose={closeDialog}
                    title="¿Deseas eliminar este dato?"
                    onConfirm={() => deleteNailDesign(nailDesign.design_id)}
                  >
                    <p className="flex gap-1 text-gray-600">
                      ID del diseño de uña:
                      <span className="font-bold">{nailDesign.design_id}</span>
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
