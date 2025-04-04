import { ChevronLeft } from "lucide-react";
import { ButtonLink } from "../../shared/components/buttonLink.tsx";
import DefaultLayout from "../../shared/components/defaultLayout.tsx";
import TableClientsInfo from "../../shared/components/tableClientInfo/tableClientInfo.tsx";

const ViewClient = () => {
  return (
    <DefaultLayout site="Clientes">
      <div className="px-2 sm:px-6 lg:px-4">
        <ButtonLink
          icon={<ChevronLeft size={28} />}
          text="Regresar"
          route="/"
        />
      </div>
      <TableClientsInfo />
    </DefaultLayout>
  );
};

export default ViewClient;
