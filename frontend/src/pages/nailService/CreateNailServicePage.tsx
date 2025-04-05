import { MainLayout } from "../../components/layouts/MainLayout/MainLayout";
import { CreateNailService } from "../../feactures/NailService/components/CreateNailService";

export const CreateNailServicePage = () => {
  return (
    <MainLayout site="Crear servicio de uña">
      <CreateNailService />
    </MainLayout>
  );
};
