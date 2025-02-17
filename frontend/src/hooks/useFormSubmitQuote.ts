import { useNavigate } from "react-router-dom";
import useQuoteApi from "./useQuoteApi";
import useClientApi from "./useClientApi";
import useQuoteServiceApi from "./useQuoteServiceApi";
import useQuoteDesignApi from "./useQuoteDesignApi";
import { FormEvent } from "react";
import { FormData } from "../models/FormData.models";

const useFormSubmit = (formData: FormData) => {
  const { addQuote } = useQuoteApi();
  const { getByNameClient, addClient } = useClientApi();
  const { addQuoteService } = useQuoteServiceApi();
  const { addQuoteDesign } = useQuoteDesignApi();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (formData) {
      console.log(formData);
      let clientId = 0;
      let quoteId = 0;
      const getClientIfExists = await getByNameClient(formData.clientInfo.name);

      if (getClientIfExists) {
        console.log("Entro en el primer if");
        clientId = getClientIfExists["client_id"];
      } else {
        console.log("Entro en el segundo if");
        const createClient = await addClient({
          name: formData.clientInfo.name,
          phone_number: formData.clientInfo.phone,
        });
        clientId = createClient?.client_id || 0;
      }

      const createQuotes = await addQuote({
        client_id: clientId,
        nail_size_id: formData.nailSize.id,
        total_amount: formData.totalPrice,
      });
      quoteId = createQuotes?.quote_id || 0;
      for (const id of formData.services.options) {
        await addQuoteService({ quote_id: quoteId, service_id: id });
      }

      for (const id of formData.designs.options) {
        await addQuoteDesign({ quote_id: quoteId, design_id: id });
      }
      navigate("/");
    }
  };

  return { handleSubmit };
};

export default useFormSubmit;
