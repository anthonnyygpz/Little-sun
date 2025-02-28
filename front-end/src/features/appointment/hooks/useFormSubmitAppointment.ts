import { useNavigate } from "react-router-dom";
import { AppointmentService } from "../";
import { ClientService } from "../../client/";
import { AppointmentServiceService } from "../../service";
import { AppointmentDesignService } from "../../design";
import { FormEvent } from "react";
import { FormData } from "../../shared/types/formDataTypes.ts";

const useFormSubmitAppointment = (formData: FormData) => {
  const { addAppointment } = AppointmentService();
  const { getByNameClient, addClient } = ClientService();
  const { addAppointmentService } = AppointmentServiceService();
  const { addAppointmentDesign } = AppointmentDesignService();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (formData) {
      let clientId = 0;
      let quoteId = 0;
      const getClientIfExists = await getByNameClient(formData.clientInfo.name);

      if (getClientIfExists) {
        clientId = getClientIfExists["client_id"];
      } else {
        const createClient = await addClient({
          name: formData.clientInfo.name,
          phone_number: formData.clientInfo.phone,
        });
        clientId = createClient?.client_id || 0;
      }

      const createQuotes = await addAppointment({
        client_id: clientId,
        nail_size_id: formData.nailSize.id,
        total_amount: formData.totalPrice,
      });
      quoteId = createQuotes?.quote_id || 0;
      for (const id of formData.services.options) {
        await addAppointmentService({ quote_id: quoteId, service_id: id });
      }

      for (const id of formData.designs.options) {
        await addAppointmentDesign({ quote_id: quoteId, design_id: id });
      }
      navigate("/");
    }
  };

  return { handleSubmit };
};

export default useFormSubmitAppointment;
