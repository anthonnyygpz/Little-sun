import { MainLayout } from "../../components/layouts/MainLayout/MainLayout";
import { MobilTableSculpingNailSize } from "../../feactures/SculpingNailSize/components/MobilTableSculpingNailSize";
import { TableSculpingNailSize } from "../../feactures/SculpingNailSize/components/TableSculpingNailSize";

export const ViewSculpingNailSizePage = () => {
  return (
    <MainLayout site="Esculpido">
      <div className="shadow-md overflow-hidden rounded-lg m-3">
        <div className="hidden md:block overflow-auto">
          <TableSculpingNailSize />
        </div>
        <MobilTableSculpingNailSize />
      </div>
    </MainLayout>
  );
};
