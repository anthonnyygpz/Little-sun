import { MobilLoadingSkeleton } from "../../../components/common/MobilLoadingSkeleton";
import { ErrorCard } from "../../../components/common/Card";
import { Client } from "../../../types/client.types";
import { useTableClient } from "../hooks/useTableClient";
import { ROUTE_PATHS } from "../../../constants/routes";
import { useModalAlert } from "../../../hooks/useModalAlert";
import { ModalAlert } from "../../../components/common/ModalAlert";
import {
  FooterMobil,
  ItemLi,
  LiContainer,
  MobilTable,
} from "../../../components/MobilTable/MobilTable";

export const MobilTableClient = () => {
  const { listClients, loading, error, listClient, deleteClient } =
    useTableClient();

  const { isOpen, openDialog, closeDialog } = useModalAlert();

  // Cargando
  if (loading)
    return (
      <div className="md:hidden">
        <ul className="divide-y divide-gray-200">
          <MobilLoadingSkeleton />
        </ul>
      </div>
    );

  // Datos Vacios
  if (listClients.length === 0)
    return (
      <div className="md:hidden text-gray-500 text-center p-4">
        No hay citas disponibles.
      </div>
    );

  // Error
  if (error) {
    return <ErrorCard onRetry={listClient} />;
  }

  return (
    <MobilTable>
      {listClients.map((client: Client) => {
        return (
          <LiContainer
            id={client.client_id}
            nameData={client.name}
            openDialog={openDialog}
            route={ROUTE_PATHS.UPDATE_APPOINTMENT}
          >
            <ItemLi title="ID:">{client.client_id}</ItemLi>
            <ItemLi title="Nombre:">{client.name}</ItemLi>
            <ItemLi title="Telefono:">{client.phone_number}</ItemLi>
            <ItemLi title="Fecha de creacion:">{client.created_at}</ItemLi>

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
          </LiContainer>
        );
      })}

      <FooterMobil />
    </MobilTable>
  );
};
