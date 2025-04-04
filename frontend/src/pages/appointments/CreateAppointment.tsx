import { Title } from "../../components/common/Title";
import { MainLayout } from "../../components/layouts/MainLayout/MainLayout";
import { GenerateAppointment } from "../../feactures/Appointment/components/GenerateAppointment";
import { ChevronLeft } from "lucide-react";
import { Button } from "../../components/common/Button";
import { ROUTE_PATHS } from "../../constants/routes";

export const CreateAppointmentPage = () => {
  return (
    <MainLayout site="Generar cita">
      {/* <Title>Generar Cita</Title> */}
      {/* <div className="px-2 sm:px-6 lg:px-4 inline-block"> */}
      {/* <Button */}
      {/*   href={ROUTE_PATHS.APPOINTMENTS} */}
      {/*   className="flex px-4 py-1 rounded-md btn-purple max-sm text-left items-center" */}
      {/* > */}
      {/*   <ChevronLeft size={28} /> */}
      {/*   <span>Regresar</span> */}
      {/* </Button> */}
      {/* </div> */}
      <GenerateAppointment />
    </MainLayout>
  );
};
