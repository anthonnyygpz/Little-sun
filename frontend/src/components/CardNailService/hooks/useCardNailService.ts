import { useEffect, useState } from "react";
import { nailServiceService } from "../../../api/nailServiceService";
import {
  NailService,
  SelectedIdsService,
} from "../../../types/nailService.types";
import { useAuth } from "../../../contexts/AuthContext/hooks/useAuth";

interface ServicesProps {
  onChange: (data: SelectedIdsService) => void;
  handleDelete?: (value: boolean) => void;
}

export const useCardNailService = ({ onChange }: ServicesProps) => {
  const [nailServices, setNailServices] = useState<NailService[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<SelectedIdsService>({
    ids: [],
    nailServiceData: [],
  });
  const { isAuthenticated, token } = useAuth();

  // hooks
  const handleCheckboxChange = (
    service_id: number,
    service_name: string,
    price: number,
  ) => {
    const isSelected = formData.ids.includes(service_id);

    let updatedOptions: number[];
    let updatedServices: { service_name: string; price: number }[];

    if (isSelected) {
      // Si el servicio ya está seleccionado, lo eliminamos
      updatedOptions = formData.ids.filter((id) => id !== service_id);
      updatedServices = formData.nailServiceData.filter(
        (service) => service.service_name !== service_name,
      );
    } else {
      // Si no, lo agregamos
      updatedOptions = [...formData.ids, service_id];
      updatedServices = [...formData.nailServiceData, { service_name, price }];
    }

    // Actualizamos el estado
    setFormData({
      ids: updatedOptions,
      nailServiceData: updatedServices,
    });

    // Llamamos a la función `onChange` con los datos actualizados
    onChange({
      ids: updatedOptions,
      nailServiceData: updatedServices,
    });
  };

  const handleUncheckAll = () => {
    setFormData({
      ids: [],
      nailServiceData: [],
    });
    onChange({
      ids: [],
      nailServiceData: [],
    });
  };

  // Apis
  // Listado de servicios de uñas
  const listNailService = async () => {
    setLoading(true);
    if (isAuthenticated && token) {
      try {
        const data = await nailServiceService.listNailService(token);
        setNailServices(data);
      } catch (error) {
        console.error(error);
        setError("Error to list nail service.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    listNailService();
  }, [isAuthenticated, token]);

  return {
    nailServices,
    loading,
    error,
    formData,
    handleCheckboxChange,
    handleUncheckAll,
    listNailService,
  };
};
