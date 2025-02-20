import { ChevronLeft } from "lucide-react";
import { ButtonLink } from "../../components/Buttons/buttonLink.tsx";
import DefaultLayout from "../../layouts/defaultLayout.tsx";
import TableClientsInfo from "../../sections/tableClientInfo.tsx";

const ClientsPage = () => {
  return (
    <DefaultLayout>
      <ButtonLink icon={<ChevronLeft size={30} />} text="Regresar" route="/" />
      <TableClientsInfo />
    </DefaultLayout>
  );
};

export default ClientsPage;
