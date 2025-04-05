import { useCallback, useEffect, useState } from "react";
import {
  SculpingNailSize,
  SculpingNailSizeForm,
} from "../../../types/sculpingNailSize.types";
import { sculpingNailsize } from "../../../api/sculpingNailSizeService";
import { useAuth } from "../../../contexts/AuthContext/hooks/useAuth";

interface useCardSculpingNailSizeProps {
  onChange: (data: SculpingNailSizeForm) => void;
}

export const useCardSculpingNailSize = ({
  onChange,
}: useCardSculpingNailSizeProps) => {
  const [listSculping, setListSculping] = useState<SculpingNailSize[]>([]);
  const [errorListSculpíng, setErrorListSculpíng] = useState<string | null>(
    null,
  );
  const [loadingListSculping, setLoadingListSculping] = useState<boolean>(true);
  const [formData, setFormData] = useState<SculpingNailSizeForm | null>();
  const { isAuthenticated, token } = useAuth();

  // hooks
  const handleSelection = (data: SculpingNailSizeForm) => {
    setFormData(data); // Solo actualiza el valor seleccionado
    onChange(data); // Pasa el objeto con el valor y el id
  };

  const handleUncheckAll = () => {
    setFormData({ nailLength: "", size_id: 0, price: 0 }); // Reinicia el valor seleccionado
    onChange({ nailLength: "", size_id: 0, price: 0 }); // Pasa el objeto con valores por defecto
  };

  // Api
  // List SculpingNailSize
  const listSculpingNailSize = useCallback(async () => {
    setLoadingListSculping(true);
    if (isAuthenticated && token) {
      try {
        const data = await sculpingNailsize.listSculpingNailSize(token);
        setListSculping(data);
      } catch (error) {
        console.error(error);
        setErrorListSculpíng("Error to list sculpingNailSize");
      } finally {
        setLoadingListSculping(false);
      }
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    listSculpingNailSize();
  }, [listSculpingNailSize, isAuthenticated, token]);

  return {
    handleUncheckAll,
    handleSelection,
    listSculping,
    errorListSculpíng,
    loadingListSculping,
    listSculpingNailSize,
    formData,
  };
};
