import { useEffect, useState } from "react";
import {
  fetchDesign,
  addDesignApi,
  updateDesignApi,
  deleteDesignApi,
} from "../api/enpoints/designApi.ts";
import {
  DesignCreate,
  DesignResponse,
  DesignUpdate,
} from "../models/design.models.ts";

const useDesignApi = () => {
  const [designs, setDesigns] = useState<DesignResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const AddDesigns = async (newDesgins: DesignCreate) => {
    try {
      const data = await addDesignApi(newDesgins);
      sessionStorage.removeItem("designs");
      getAllDesigns();
      return data;
    } catch (error) {
      console.error("Error deleting design:", error);
      throw error; // Opcional: puedes relanzar el error si necesitas manejarlo en otro lugar
    }
  };

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

  const updateDesigns = async (editDesigns: DesignUpdate) => {
    try {
      const data = await updateDesignApi(editDesigns);
      return data;
    } catch (error) {
      console.error("Error updating design:", error);
      throw error; // Opcional: puedes relanzar el error si necesitas manejarlo en otro lugar
    }
  };
  const deleteDesigns = async (id: number) => {
    try {
      const data = await deleteDesignApi(id);
      sessionStorage.removeItem("designs");
      getAllDesigns();
      return data;
    } catch (error) {
      console.error("Error deleting design:", error);
      throw error; // Opcional: puedes relanzar el error si necesitas manejarlo en otro lugar
    }
  };

  useEffect(() => {
    getAllDesigns();
  }, []);

  return { designs, loading, error, AddDesigns, updateDesigns, deleteDesigns };
};

export default useDesignApi;
