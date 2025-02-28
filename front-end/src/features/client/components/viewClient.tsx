import { ChevronLeft } from "lucide-react";
import { ButtonLink } from "../../shared/components/buttonLink.tsx";
import DefaultLayout from "../../shared/components/defaultLayout.tsx";
import TableClientsInfo from "../../shared/components/tableClientInfo/tableClientInfo.tsx";

const ViewClient = () => {
  return (
    <DefaultLayout>
      <ButtonLink icon={<ChevronLeft size={30} />} text="Regresar" route="/" />
      <TableClientsInfo />
    </DefaultLayout>
  );
};

export default ViewClient;
