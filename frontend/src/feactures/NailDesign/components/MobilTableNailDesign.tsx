import {
  FooterMobil,
  ItemLi,
  LiContainer,
  MobilTable,
} from "../../../components/MobilTable/MobilTable";
import { ROUTE_PATHS } from "../../../constants/routes";
import { useModalAlert } from "../../../hooks/useModalAlert";
import { NailDesign } from "../../../types/nailDesign.types";
import { useTableNailDesign } from "../hooks/useTableNailDesign";
import { ModalAlert } from "../../../components/common/ModalAlert";

export const MobilTableNailDesign = () => {
  const { nailDesigns, deleteNailDesign } = useTableNailDesign();
  const { isOpen, openDialog, closeDialog } = useModalAlert();

  return (
    <MobilTable>
      {nailDesigns.map((nailDesign: NailDesign) => {
        return (
          <LiContainer
            id={nailDesign.design_id}
            nameData={nailDesign.design_name}
            openDialog={openDialog}
            route={ROUTE_PATHS.UDPATE_NAIL_DESIGN}
          >
            <ItemLi title="ID:">{nailDesign.design_id}</ItemLi>
            <ItemLi title="Nombre del diseño:">{nailDesign.design_name}</ItemLi>
            <ItemLi title="Precio Base:">{nailDesign.base_price}</ItemLi>

            <ModalAlert
              isOpen={isOpen}
              onClose={closeDialog}
              title="¿Deseas eliminar esta cita?"
              onConfirm={() => deleteNailDesign(nailDesign.design_id)}
            >
              <p className="flex gap-1 text-gray-600">
                ID de la cita:
                <span className="font-bold">{nailDesign.design_id}</span>
              </p>
            </ModalAlert>
          </LiContainer>
        );
      })}
      <FooterMobil />
    </MobilTable>
  );
};
