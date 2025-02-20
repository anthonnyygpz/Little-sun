import { QuoteDesignCreate } from "../models/quoteDesign.models.ts";
import { createQuoteDesign } from "../api/enpoints/quoteDesignApi.ts";

const useQuoteDesign = () => {
  const addQuoteDesign = async (newQuoteDesign: QuoteDesignCreate) => {
    try {
      const createdQuoteDesign = await createQuoteDesign(newQuoteDesign);
      return createdQuoteDesign;
    } catch {
      console.error("Failed to create quote designs");
    }
  };

  return { addQuoteDesign };
};

export default useQuoteDesign;
