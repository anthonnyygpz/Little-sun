import { useCallback, useEffect, useState } from "react";
import { NailService } from "../../../types/nailService.types";
import { useAuth } from "../../../contexts/AuthContext/hooks/useAuth";
import { nailServiceService } from "../../../api/nailServiceService";
import { toast } from "react-toastify";
import { TOAST_Message } from "../../../constants/toast";

export const useTableNailService = () => {
  const [nailServices, setNailServices] = useState<NailService[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { isAuthenticated, token } = useAuth();

  // Apis
  const listNailService = useCallback(async () => {
    if (isAuthenticated && token) {
      setLoading(true);
      try {
        const data = await nailServiceService.listNailService(token);
        setNailServices(data);
      } catch {
        setError("Error to list nail service.");
      } finally {
        setLoading(false);
      }
    }
  }, [isAuthenticated, token]);

  const deleteNailService = useCallback(
    async (id: number) => {
      if (isAuthenticated && token) {
        try {
          await toast.promise(nailServiceService.deleteNailService(token, id), {
            success: TOAST_Message.SUCCESS_DELETE,
            pending: TOAST_Message.PENDING_DELETE,
            error: TOAST_Message.ERROR_DELETE,
          });
          listNailService();
        } catch {
          setError("Error to delete nail service");
        } finally {
          setLoading(false);
        }
      }
    },
    [listNailService, isAuthenticated, token],
  );

  useEffect(() => {
    listNailService();
  }, [listNailService]);

  return { nailServices, error, loading, deleteNailService, listNailService };
};
