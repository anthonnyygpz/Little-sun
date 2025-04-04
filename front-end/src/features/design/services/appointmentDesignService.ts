import { AppointmentDesignCreate } from "../../shared/types/appointmentDesignTypes.ts";
import { createAppointmentDesign } from "../../../lib/enpoints/appointmentDesignApi.ts";

const AppointmentDesignService = () => {
  const addAppointmentDesign = async (
    newAppointmentDesign: AppointmentDesignCreate,
  ) => {
    try {
      const createdQuoteDesign =
        await createAppointmentDesign(newAppointmentDesign);
      return createdQuoteDesign;
    } catch {
      console.error("Failed to create appointment designs");
    }
  };

  return { addAppointmentDesign };
};

export default AppointmentDesignService;
