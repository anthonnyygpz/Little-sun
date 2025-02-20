import { QuoteServiceCreate } from "../../models/quoteService.models.ts";
import apiClient from "../apiClient.ts";

export const createQuoteService = async (quoteService: QuoteServiceCreate) => {
  try {
    const response = await apiClient.post("/quote_services/", quoteService);
    return response.data;
  } catch {
    throw new Error("Failed to create quote services");
  }
};

export const deleteQuoteService = async (id: number) => {
  try {
    const response = await apiClient.delete(
      "/quote_services/delete?quote_id=" + id,
    );
    return response.data;
  } catch {
    throw new Error("Failed to create quote services");
  }
};
