import { useCallback, useEffect, useState } from "react";
import { NailDesign } from "../../../types/nailDesign.types";
import { useAuth } from "../../../contexts/AuthContext/hooks/useAuth";
import { nailDesignService } from "../../../api/nailDesignService";
import { TOAST_MESSAGE } from "../../../constants/toast";
import { toast } from "react-hot-toast";

export const useTableNailDesign = () => {
  const [nailDesigns, setNailDesigns] = useState<NailDesign[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { isAuthenticated, token } = useAuth();

  const listNailDesign = useCallback(async () => {
    if (isAuthenticated && token) {
      setLoading(true);
      try {
        const data = await nailDesignService.listNailDesign(token);
        setNailDesigns(data);
      } catch (error) {
        setError(String(error));
      } finally {
        setLoading(false);
      }
    }
  }, [isAuthenticated, token]);

  const deleteNailDesign = useCallback(
    async (id: number) => {
      if (isAuthenticated && token) {
        try {
          await toast.promise(nailDesignService.deleteNailDesign(token, id), {
            success: TOAST_MESSAGE.SUCCESS_DELETE,
            loading: TOAST_MESSAGE.LOADING_DELETE,
            error: TOAST_MESSAGE.ERROR_DELETE,
          });
          listNailDesign();
        } catch (error) {
          setError(String(error));
        }
      }
    },
    [listNailDesign, isAuthenticated, token],
  );

  useEffect(() => {
    listNailDesign();
  }, [listNailDesign]);

  return { nailDesigns, error, loading, deleteNailDesign, listNailDesign };
};
