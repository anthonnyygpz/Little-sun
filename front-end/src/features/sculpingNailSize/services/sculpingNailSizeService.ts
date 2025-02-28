import { useEffect, useState } from "react";
import {
  getAllSculpingApi,
  deleteSculpingApi,
} from "../../../libs/enpoints/sculpinNailSizeApi.ts";
import { SculpingNailSizeResponse } from "../../shared/types/sculpingNailSizeTypes.ts";

const SculpingNailSizeService = () => {
  const [sculpingSizes, setSculpingSizes] = useState<
    SculpingNailSizeResponse[]
  >([]);
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
          const data = await getAllSculpingApi();
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
  };

  const deleteSculpingSize = async (id: number) => {
    try {
      const data = await deleteSculpingApi(id);
      return data;
    } catch (error) {
      console.error("Error deleting sculping size:", error);
      throw error; // Opcional: puedes relanzar el error si necesitas manejarlo en otro lugar
    }
  };

  useEffect(() => {
    getAllSculpingSize();
  }, []);

  return { sculpingSizes, loading, error, deleteSculpingSize };
};

export default SculpingNailSizeService;
