import { useEffect, useState } from "react";
import { fetchQuotes, createQuote, updateQuote, deleteSculping } from "../api/enpoints/quoteApi.ts";
import { Quote, QuoteCreate, QuoteUpdate } from "../models/Quote.models.ts";

const useQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const addQuote = async (newQuote: QuoteCreate) => {
    try {
      const createdQuote = await createQuote(newQuote);
      return createdQuote;
    } catch {
      setError("Failed to create quote");
    }
  };

  const getQuotes = async () => {
    try {
      const data = await fetchQuotes();
      setQuotes(data);
    } catch {
      setError("Failed to fetch quotes");
    } finally {
      setLoading(false);
    }
  };

  const editQuote = async (newQuote: QuoteUpdate) => {
    try {
      const updatedQuote = await updateQuote(newQuote)
      return updatedQuote;
    } catch {
      setError("Failed to create quote");
    }
  }


  const deleteSculpingSize = async (id: number) => {
    try {
      const data = await deleteSculping(id);
      return data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getQuotes();
  }, []);

  return { quotes, loading, error, addQuote, getQuotes, editQuote, deleteSculpingSize };
};

export default useQuotes;
