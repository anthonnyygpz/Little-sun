import { useEffect, useState } from "react";
import { fetchDesign } from "../api/enpoints/designApi";
import { Design } from "../models/Design.models";

const useDesigns = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
  }, []);
  return { designs, loading, error };
};

export default useDesigns;
