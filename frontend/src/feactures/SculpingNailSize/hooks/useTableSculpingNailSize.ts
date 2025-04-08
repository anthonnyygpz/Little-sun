import { useCallback, useEffect, useState } from "react";
import { SculpingNailSize } from "../../../types/sculpingNailSize.types";
import { sculpingNailsizeService } from "../../../api/sculpingNailSizeService";
import { useAuth } from "../../../contexts/AuthContext/hooks/useAuth";
import toast from "react-hot-toast";
import { TOAST_MESSAGE } from "../../../constants/toast";

export const useTableSculpingNailSize = () => {
  const [sculpingNailSizes, setSculpingNailSizes] = useState<
    SculpingNailSize[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { isAuthenticated, token } = useAuth();

  // Apis
  const listSculpingNailSize = useCallback(async () => {
    if (isAuthenticated && token) {
      setLoading(true);
      setError(null);
      try {
        const data = await sculpingNailsizeService.listSculpingNailSize(token);
        setSculpingNailSizes(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Ocurrio un error desconocido");
        }
      } finally {
        setLoading(false);
      }
    }
  }, [isAuthenticated, token]);

  const deleteSculpingNailSize = useCallback(
    async (id: number) => {
      if (isAuthenticated && token) {
        try {
          await toast.promise(
            sculpingNailsizeService.deleteSculpingNailSize(token, id),
            {
              success: TOAST_MESSAGE.SUCCESS_DELETE,
              loading: TOAST_MESSAGE.LOADING_DELETE,
              error: TOAST_MESSAGE.ERROR_DELETE,
            },
          );
          listSculpingNailSize();
        } catch {
          console.log("Erro to delete sculping nail size.");
        }
      }
    },
    [listSculpingNailSize, isAuthenticated, token],
  );

  useEffect(() => {
    listSculpingNailSize();
  }, [listSculpingNailSize]);

  return {
    sculpingNailSizes,
    loading,
    error,
    listSculpingNailSize,
    deleteSculpingNailSize,
  };
};
