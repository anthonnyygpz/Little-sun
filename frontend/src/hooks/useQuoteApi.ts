import { useEffect, useState } from "react";
import {
  getAllQuoteApi,
  createQuoteApi,
  updateQuoteApi,
  deleteQuoteApi,
  deleteNailSizeApi,
} from "../api/enpoints/quoteApi.ts";
import {
  QuoteCreate,
  QuoteResponse,
  QuoteUpdate,
} from "../models/quote.models.ts";

const useQuoteApi = () => {
  const [quotes, setQuotes] = useState<QuoteResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const addQuote = async (newQuote: QuoteCreate) => {
    try {
      const createdQuote = await createQuoteApi(newQuote);
      sessionStorage.removeItem("quotes");
      getAllQuotes();
      return createdQuote;
    } catch {
      setError("Failed to create quote");
    }
  };

  const getAllQuotes = async () => {
    const cacheSize = sessionStorage.getItem("quotes");
    if (cacheSize) {
      setQuotes(JSON.parse(cacheSize));
      setLoading(false);
    } else {
      const getQuotes = async () => {
        try {
          const data = await getAllQuoteApi();
          sessionStorage.setItem("quotes", JSON.stringify(data));
          setQuotes(data);
        } catch {
          setError("Failed to fetch quotes");
        } finally {
          setLoading(false);
        }
      };

      getQuotes();
    }
  };

  const editQuote = async (newQuote: QuoteUpdate) => {
    try {
      const updatedQuote = await updateQuoteApi(newQuote);
      sessionStorage.removeItem("quotes");
      getAllQuoteApi();
      return updatedQuote;
    } catch {
      setError("Failed to create quote");
    }
  };

  const deleteQuote = async (id: number) => {
    try {
      const data = await deleteQuoteApi(id);
      sessionStorage.removeItem("quotes");
      getAllQuoteApi();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNailSize = async (id: number) => {
    try {
      const data = await deleteNailSizeApi(id);
      sessionStorage.removeItem("quotes");
      getAllQuoteApi();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllQuotes();
  }, []);

  return {
    quotes,
    loading,
    error,
    addQuote,
    getAllQuotes,
    editQuote,
    deleteNailSize,
    deleteQuote,
  };
};

export default useQuoteApi;
