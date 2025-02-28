import { AppointmentServiceCreate } from "../../shared/types/appointmentServiceTypes.ts";
import { createAppointmentService } from "../../../libs/enpoints/appointmentServiceApi.ts";

const AppointmentServiceService = () => {
  const addAppointmentService = async (
    newAppointmentService: AppointmentServiceCreate,
  ) => {
    try {
      const createdAppointmentService = await createAppointmentService(
        newAppointmentService,
      );
      return createdAppointmentService;
    } catch {
      console.error("Failed to create appointment services");
    }
  };

  return { addAppointmentService };
};
export default AppointmentServiceService;
