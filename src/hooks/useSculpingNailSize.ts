import { useEffect, useState } from "react";
import { fetchSculpings } from "../api/enpoints/sculpinNailSizeApi.ts";
import { SculpingNailSize } from "../models/SculpingNailSize.models.ts";

const useSculpingNailSizes = () => {
  const [sculpingSizes, setSculpingSizes] = useState<SculpingNailSize[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getAllSculpingSize = async () => {
    const cacheSizes = sessionStorage.getItem("sculpingSizes");
    if (cacheSizes) {
      setSculpingSizes(JSON.parse(cacheSizes));
      setLoading(false);
    } else {
      const getSculpingSizes = async () => {
        try {
          const data = await fetchSculpings();
          setSculpingSizes(data);
          sessionStorage.setItem("sculpingSizes", JSON.stringify(data));
        } catch {
          setError("Failed to fetch sculping nail size");
        } finally {
          setLoading(false);
        }
      };
      getSculpingSizes();
    }
  }

  useEffect(() => {
    getAllSculpingSize();
  }, []);

  return { sculpingSizes, loading, error };
};

export default useSculpingNailSizes;
