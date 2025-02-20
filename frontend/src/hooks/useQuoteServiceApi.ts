import { QuoteServiceCreate } from "../models/quoteService.models.ts";
import { createQuoteService } from "../api/enpoints/quoteServiceApi.ts";

const useQuoteServiceApi = () => {
  const addQuoteService = async (newQuoteDesign: QuoteServiceCreate) => {
    try {
      const createdQuoteService = await createQuoteService(newQuoteDesign);
      console.log(createdQuoteService);
      return createdQuoteService;
    } catch {
      console.error("Failed to create quote services");
    }
  };

  return { addQuoteService };
};
export default useQuoteServiceApi;
