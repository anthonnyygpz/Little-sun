import { ToastContainer } from "react-toastify/unstyled";
import { MainLayout } from "../../components/layouts/MainLayout/MainLayout";
import { TableClient } from "../../feactures/Client/components/TableClient";
import { Button } from "../../components/common/Button";
import { ChevronLeft } from "lucide-react";
import { ROUTE_PATHS } from "../../constants/routes";

export const ViewClient = () => {
  return (
    <MainLayout site="Clientes">
      <div className="ml-2 flex items-center gap-1">
        <Button
          className="rounded-full bg-purple-400 p-1 text-white transition-colors hover:bg-purple-500 active:bg-purple-200 active:text-purple-400"
          href={ROUTE_PATHS.APPOINTMENTS}
        >
          <ChevronLeft size={28} />
        </Button>
      </div>
      <div className="shadow-md overflow-hidden rounded-lg m-3">
        <div className="hidden md:block overflow-auto">
          <TableClient />
        </div>
      </div>
      <ToastContainer />
    </MainLayout>
  );
};
