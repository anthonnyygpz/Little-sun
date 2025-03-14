import DefaultLayout from "../../shared/components/defaultLayout.tsx";
import { MenuHamburguer } from "../../shared/components/menuHamburguer.tsx";
import TableAppointment from "../../shared/components/tableAppointment/tableAppointment.tsx";
const ViewAppointment: React.FC = () => {
  return (
    <DefaultLayout site="Citas">
      <TableAppointment />
      <MenuHamburguer />
    </DefaultLayout>
  );
};
export default ViewAppointment;
