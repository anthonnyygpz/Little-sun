import { useCallback, useEffect, useState } from "react";
import { NailDesign } from "../../../types/nailDesign.types";
import { useAuth } from "../../../contexts/AuthContext/hooks/useAuth";
import { nailDesignService } from "../../../api/nailDesignService";
import { toast } from "react-toastify";
import { TOAST_Message } from "../../../constants/toast";

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
            success: TOAST_Message.SUCCESS_DELETE,
            pending: TOAST_Message.PENDING_DELETE,
            error: TOAST_Message.ERROR_DELETE,
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
