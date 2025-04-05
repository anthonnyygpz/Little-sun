import { useCallback, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext/hooks/useAuth";
import { nailServiceService } from "../../../api/nailServiceService";
import { TOAST_MESSAGE } from "../../../constants/toast";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants/routes";
import toast from "react-hot-toast";
import { useFieldValidation } from "../../../hooks/useFieldValidation";

interface Service {
  id: number;
  name: string;
  price: string;
}

export const useCreateNailService = () => {
  const [nailServices, setNailServices] = useState<Service[]>([
    { id: 1, name: "", price: "" },
  ]);
  const { isAuthenticated, token } = useAuth();
  const { filterFieldValue } = useFieldValidation();
  const navigate = useNavigate();

  const handleUploadData = useCallback(async () => {
    try {
      if (isAuthenticated && token) {
        for (const nailService of nailServices) {
          await toast.promise(
            nailServiceService.createNailService(token, {
              service_name: nailService.name,
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
  }, [navigate, nailServices, isAuthenticated, token]);

  const updateNailService = useCallback(
    (id: number, field: keyof Service, value: string) => {
      const filterValue = filterFieldValue(field, value);
      setNailServices(
        nailServices.map((nailService) =>
          nailService.id === id
            ? { ...nailService, [field]: filterValue }
            : nailService,
        ),
      );
    },
    [nailServices, filterFieldValue],
  );

  const deleteNailService = useCallback(
    (id: number) => {
      if (nailServices.length > 1) {
        setNailServices(
          nailServices.filter((nailService) => nailService.id !== id),
        );
      }
    },
    [nailServices],
  );

  const addNailService = useCallback(() => {
    const newId =
      nailServices.length > 0
        ? Math.max(...nailServices.map((nailService) => nailService.id)) + 1
        : 1;
    setNailServices([...nailServices, { id: newId, name: "", price: "" }]);
  }, [nailServices]);

  return {
    nailServices,
    setNailServices,
    updateNailService,
    deleteNailService,
    addNailService,
    handleUploadData,
  };
};
