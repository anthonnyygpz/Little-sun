import { MainLayout } from "../../components/layouts/MainLayout/MainLayout";
import { MobilTableNailService } from "../../feactures/NailService/components/MobilTableNailService";
import { TableNailService } from "../../feactures/NailService/components/TableNailService";

export const ViewNailService = () => {
  return (
    <MainLayout site="Servicio de uñas">
      <div className="shadow-md overflow-hidden rounded-lg m-3">
        <div className="hidden md:block overflow-auto">
          <TableNailService />
        </div>
        <MobilTableNailService />
      </div>
    </MainLayout>
  );
};
