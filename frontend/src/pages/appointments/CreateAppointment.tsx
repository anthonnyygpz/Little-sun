import { MainLayout } from "../../components/layouts/MainLayout/MainLayout";
import { GenerateAppointment } from "../../feactures/Appointment/components/GenerateAppointment";

export const CreateAppointmentPage = () => {
  return (
    <MainLayout site="Generar cita">
      <GenerateAppointment />
    </MainLayout>
  );
};
