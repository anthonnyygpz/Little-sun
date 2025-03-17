import DefaultLayout from "../../shared/components/defaultLayout.tsx";
import TableAppointment from "../../shared/components/tableAppointment/tableAppointment.tsx";
const ViewAppointment: React.FC = () => {
  return (
    <DefaultLayout site="Citas">
      <TableAppointment />
    </DefaultLayout>
  );
};
export default ViewAppointment;
