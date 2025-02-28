import DefaultLayout from "../../shared/components/defaultLayout.tsx";
import { MenuHamburguer } from "../../shared/components/menuHamburguer.tsx";
import TableQuote from "../../shared/components/tableAppointment/tableAppointment.tsx";
const ViewAppointment: React.FC = () => {
  return (
    <DefaultLayout site="Citas">
      <TableQuote />
      <MenuHamburguer />
    </DefaultLayout>
  );
};
export default ViewAppointment;
