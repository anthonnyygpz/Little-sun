import { useCallback, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext/hooks/useAuth";
import { useFieldValidation } from "../../../hooks/useFieldValidation";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { nailDesignService } from "../../../api/nailDesignService";
import { TOAST_MESSAGE } from "../../../constants/toast";
import { ROUTE_PATHS } from "../../../constants/routes";

interface Design {
  id: number;
  name: string;
  price: string;
}

export const useCreateNailDesign = () => {
  const [nailDesigns, setNailDesigns] = useState<Design[]>([
    { id: 1, name: "", price: "" },
  ]);
  const { isAuthenticated, token } = useAuth();
  const { filterFieldValue } = useFieldValidation();
  const navigate = useNavigate();

  const handleUploadData = useCallback(async () => {
    try {
      if (isAuthenticated && token) {
        for (const nailDesign of nailDesigns) {
          await toast.promise(
            nailDesignService.createNailDesign(token, {
              design_name: nailDesign.name,
              base_price: Number(nailDesign.price),
            }),
            {
              success: TOAST_MESSAGE.SUCCESS_CREATE,
              loading: TOAST_MESSAGE.LOADING_CREATE,
              error: TOAST_MESSAGE.ERROR_CREATE,
            },
          );
        }
        navigate(ROUTE_PATHS.NAIL_DESIGN);
      }
    } catch (error) {
      console.error(error);
    }
  }, [navigate, nailDesigns, isAuthenticated, token]);

  const updateNailDesign = useCallback(
    async (id: number, field: keyof Design, value: string) => {
      const filterValue = filterFieldValue(field, value);
      setNailDesigns(
        nailDesigns.map((nailDesign) =>
          nailDesign.id === id
            ? { ...nailDesign, [field]: filterValue }
            : nailDesign,
        ),
      );
    },
    [nailDesigns, filterFieldValue],
  );

  const deleteNailDesign = useCallback(
    (id: number) => {
      if (nailDesigns.length > 1) {
        setNailDesigns(
          nailDesigns.filter((nailDesign) => nailDesign.id !== id),
        );
      }
    },
    [nailDesigns],
  );

  const addNailDesign = useCallback(() => {
    const newId =
      nailDesigns.length > 0
        ? Math.max(...nailDesigns.map((nailDesign) => nailDesign.id)) + 1
        : 1;
    setNailDesigns([...nailDesigns, { id: newId, name: "", price: "" }]);
  }, [nailDesigns]);

  return {
    nailDesigns,
    handleUploadData,
    updateNailDesign,
    deleteNailDesign,
    addNailDesign,
  };
};
