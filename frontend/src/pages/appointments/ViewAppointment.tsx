import { MainLayout } from "../../components/layouts/MainLayout/MainLayout";
import { MobilTableAppointment } from "../../feactures/Appointment/components/MobilTableAppointment";
import { TableAppointment } from "../../feactures/Appointment/components/TableAppointment";

export const AppointmentPage = () => {
  return (
    <MainLayout site="Citas">
      <div className="shadow-md overflow-hidden rounded-lg m-3">
        <div className="hidden md:block overflow-auto">
          <TableAppointment />
        </div>
        <MobilTableAppointment />
      </div>
    </MainLayout>
  );
};
