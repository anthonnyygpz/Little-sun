import apiClient from "../apiClient.ts"; // Importa la instancia de axios configurada
import { Quote, QuoteCreate, QuoteUpdate } from "../../models/Quote.models.ts";

// Función para obtener los quotes (GET)
export const fetchQuotes = async (): Promise<Quote[]> => {
  try {
    const response = await apiClient.get<Quote[]>("/quotes/all"); // Asegúrate de que la ruta sea correcta
    return response.data;
  } catch (error) {
    console.error("Error fetching quotes:", error);
    throw new Error("Failed to fetch quotes");
  }
};

// Función para crear un nuevo quote (POST)
export const createQuote = async (quote: QuoteCreate): Promise<Quote> => {
  try {
    const response = await apiClient.post("/quotes/create", quote); // Asegúrate de que la ruta sea correcta
    return response.data;
  } catch (error) {
    console.error("Error creating quote:", error);
    throw new Error("Failed to create quote");
  }
};

export const updateQuote = async (quote: QuoteUpdate) => {
  try {
    const response = await apiClient.put("/quotes/update", quote);
    return response.data;
  } catch (error) {
    console.error("Error creating quote:", error);
    throw new Error("Failed to create quote");

  }
};

export const deleteQuote = async (id: number) => {
  try {
    const response = await apiClient.delete("/quotes/delete?quote_id=" + id)
    return response.data
  } catch {
    throw new Error("Failded to fetch quotes");
  }

}

export const deleteSculping = async (id: number) => {
  try {
    const response = await apiClient.put("/quotes/delete_sculping?quote_id=" + id)
    return response.data
  } catch {
    throw new Error("Failded to fetch quotes");
  }
} 
