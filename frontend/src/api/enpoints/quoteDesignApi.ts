import { QuoteDesignCreate } from "../../models/quoteDesign.models.ts";
import apiClient from "../apiClient.ts";

export const createQuoteDesign = async (quoteDesign: QuoteDesignCreate) => {
  try {
    const response = await apiClient.post("/quote_designs/", quoteDesign);
    return response.data;
  } catch {
    throw new Error("Failed to create quote services");
  }
};

export const deleteQuoteDesign = async (id: number) => {
  try {
    const response = await apiClient.delete(
      "/quote_designs/delete?quote_id=" + id,
    );
    return response.data;
  } catch {
    throw new Error("Failed to create quote services");
  }
};
