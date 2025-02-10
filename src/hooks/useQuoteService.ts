import { QuoteServiceCreate } from "../models/QuoteService.models.ts";
import { createQuoteService } from "../api/enpoints/quoteServiceApi.ts";

const useQuoteService = () => {
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
}
export default useQuoteService;
