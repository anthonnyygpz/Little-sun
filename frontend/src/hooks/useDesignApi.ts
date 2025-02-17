import { useEffect, useState } from "react";
import { fetchDesign } from "../api/enpoints/designApi";
import { DesignResponse } from "../models/Design.models";

const useDesignApi = () => {
  const [designs, setDesigns] = useState<DesignResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getAllDesigns = () => {
    const cacheSizes = sessionStorage.getItem("designs");
    if (cacheSizes) {
      setDesigns(JSON.parse(cacheSizes));
      setLoading(false);
    } else {
      const getDesigns = async () => {
        try {
          const data = await fetchDesign();
          setDesigns(data);
        } catch {
          setError("Failed to fetch users");
        } finally {
          setLoading(false);
        }
      };
      getDesigns();
    }
  };

  useEffect(() => {
    getAllDesigns();
  }, []);

  return { designs, loading, error };
};

export default useDesignApi;
