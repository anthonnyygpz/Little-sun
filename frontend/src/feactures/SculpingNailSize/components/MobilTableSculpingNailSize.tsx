import {
  FooterMobil,
  ItemLi,
  LiContainer,
  MobilTable,
} from "../../../components/MobilTable/MobilTable";
import { useModalAlert } from "../../../hooks/useModalAlert";
import { useTableSculpingNailSize } from "../hooks/useTableSculpingNailSize";
import { SculpingNailSize } from "../../../types/sculpingNailSize.types";
import { ROUTE_PATHS } from "../../../constants/routes";
import { ModalAlert } from "../../../components/common/ModalAlert";
import { MobilLoadingSkeleton } from "../../../components/common/MobilLoadingSkeleton";
import { ErrorCard } from "../../../components/common/Card";

export const MobilTableSculpingNailSize = () => {
  const {
    sculpingNailSizes,
    loading,
    error,
    listSculpingNailSize,
    deleteSculpingNailSize,
  } = useTableSculpingNailSize();
  const { isOpen, openDialog, closeDialog } = useModalAlert();

  if (loading) {
    return (
      <div className="md:hidden">
        <ul className="divide-y divide-gray-200">
          <MobilLoadingSkeleton />
        </ul>
      </div>
    );
  }

  if (sculpingNailSizes.length === 0) {
    return (
      <div className="md:hidden text-gray-500 text-center p-4">
        No hay esculpidos disponibles.
      </div>
    );
  }

  if (error) {
    return <ErrorCard onRetry={listSculpingNailSize} />;
  }

  return (
    <MobilTable>
      {sculpingNailSizes.map((sculping: SculpingNailSize) => {
        return (
          <LiContainer
            id={sculping.size_id}
            nameData={sculping.size_name}
            openDialog={openDialog}
            route={ROUTE_PATHS.UPDATE_SCULPING}
          >
            <ItemLi title="ID:">{sculping.size_id}</ItemLi>
            <ItemLi title="Nombre del esculpido:">{sculping.size_name}</ItemLi>
            <ItemLi title="Precio Base:">{sculping.base_price}</ItemLi>

            <ModalAlert
              isOpen={isOpen}
              onClose={closeDialog}
              title="¿Deseas eliminar esta cita?"
              onConfirm={() => deleteSculpingNailSize(sculping.size_id)}
            >
              <p className="flex gap-1 text-gray-600">
                ID de la cita:
                <span className="font-bold">{sculping.size_id}</span>
              </p>
            </ModalAlert>
          </LiContainer>
        );
      })}
      <FooterMobil />
    </MobilTable>
  );
};
