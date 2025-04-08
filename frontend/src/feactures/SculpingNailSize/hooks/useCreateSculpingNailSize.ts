import { useCallback, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext/hooks/useAuth";
import { useFieldValidation } from "../../../hooks/useFieldValidation";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { sculpingNailsizeService } from "../../../api/sculpingNailSizeService";
import { TOAST_MESSAGE } from "../../../constants/toast";
import { ROUTE_PATHS } from "../../../constants/routes";

interface Sculping {
  id: number;
  name: string;
  price: string;
}
export const useSculpingNailSize = () => {
  const [sulpingNailSizes, setSculpingNailSizes] = useState<Sculping[]>([
    { id: 1, name: "", price: "" },
  ]);
  const { isAuthenticated, token } = useAuth();
  const { filterFieldValue } = useFieldValidation();
  const navigate = useNavigate();

  const handleUploadData = useCallback(async () => {
    try {
      if (isAuthenticated && token) {
        for (const nailService of sulpingNailSizes) {
          await toast.promise(
            sculpingNailsizeService.createSculpingNailSize(token, {
              size_name: nailService.name,
              base_price: Number(nailService.price),
            }),
            {
              success: TOAST_MESSAGE.SUCCESS_CREATE,
              loading: TOAST_MESSAGE.LOADING_CREATE,
              error: TOAST_MESSAGE.ERROR_CREATE,
            },
          );
        }
        navigate(ROUTE_PATHS.NAIL_SERVICE);
      }
    } catch (error) {
      console.error(error);
    }
  }, [navigate, sulpingNailSizes, isAuthenticated, token]);

  const updateSculpingNailSize = useCallback(
    (id: number, field: keyof Sculping, value: string) => {
      const filterValue = filterFieldValue(field, value);
      setSculpingNailSizes(
        sulpingNailSizes.map((nailService) =>
          nailService.id === id
            ? { ...nailService, [field]: filterValue }
            : nailService,
        ),
      );
    },
    [sulpingNailSizes, filterFieldValue],
  );

  const deleteSculpingNailSize = useCallback(
    (id: number) => {
      if (sulpingNailSizes.length > 1) {
        setSculpingNailSizes(
          sulpingNailSizes.filter((nailService) => nailService.id !== id),
        );
      }
    },
    [sulpingNailSizes],
  );

  const addSculpingNailSize = useCallback(() => {
    const newId =
      sulpingNailSizes.length > 0
        ? Math.max(...sulpingNailSizes.map((nailService) => nailService.id)) + 1
        : 1;
    setSculpingNailSizes([
      ...sulpingNailSizes,
      { id: newId, name: "", price: "" },
    ]);
  }, [sulpingNailSizes]);

  return {
    sulpingNailSizes,
    setSculpingNailSizes,
    updateSculpingNailSize,
    deleteSculpingNailSize,
    addSculpingNailSize,
    handleUploadData,
  };
};
