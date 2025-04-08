import { ModalAlert } from "../../../components/common/ModalAlert";
import {
  FooterMobil,
  ItemLi,
  LiContainer,
  MobilTable,
} from "../../../components/MobilTable/MobilTable";
import { ROUTE_PATHS } from "../../../constants/routes";
import { useModalAlert } from "../../../hooks/useModalAlert";
import { NailService } from "../../../types/nailService.types";
import { useTableNailService } from "../hooks/useTableNailService";

export const MobilTableNailService = () => {
  const { nailServices, deleteNailService } = useTableNailService();
  const { isOpen, openDialog, closeDialog } = useModalAlert();
  return (
    <MobilTable>
      {nailServices.map((nailService: NailService) => {
        return (
          <LiContainer
            id={nailService.service_id}
            nameData={nailService.service_name}
            openDialog={openDialog}
            route={ROUTE_PATHS.UPDATE_NAIL_SERVICE}
          >
            <ItemLi title="ID:">{nailService.service_id}</ItemLi>
            <ItemLi title="Nombre del servicio:">
              {nailService.service_name}
            </ItemLi>
            <ItemLi title="Precio Base:">{nailService.base_price}</ItemLi>

            <ModalAlert
              isOpen={isOpen}
              onClose={closeDialog}
              title="¿Deseas eliminar esta cita?"
              onConfirm={() => deleteNailService(nailService.service_id)}
            >
              <p className="flex gap-1 text-gray-600">
                ID de la cita:
                <span className="font-bold">{nailService.service_id}</span>
              </p>
            </ModalAlert>
          </LiContainer>
        );
      })}
      <FooterMobil />
    </MobilTable>
  );
};
