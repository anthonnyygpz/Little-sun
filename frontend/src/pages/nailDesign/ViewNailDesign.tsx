import { MainLayout } from "../../components/layouts/MainLayout/MainLayout";
import { MobilTableNailDesign } from "../../feactures/NailDesign/components/MobilTableNailDesign";
import { TableNailDesign } from "../../feactures/NailDesign/components/TableNailDesign";

export const ViewNailDesign = () => {
  return (
    <MainLayout site="Diseño de uñas">
      <div className="shadow-md overflow-hidden rounded-lg m-3">
        <div className="hidden md:block overflow-auto">
          <TableNailDesign />
        </div>
        <MobilTableNailDesign />
      </div>
    </MainLayout>
  );
};
