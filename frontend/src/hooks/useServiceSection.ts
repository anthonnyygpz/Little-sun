import { useState } from "react";
import useServiceApi from "./useServiceApi.ts";

interface SelectedItems {
  options: number[];
  services: { name: string; price: number }[];
}

interface ServicesProps {
  onChange: (data: {
    options: number[];
    services: { name: string; price: number }[];
  }) => void;
  handleDelete?: (value: boolean) => void;
}

export const useServices = ({ onChange, handleDelete }: ServicesProps) => {
  const { services, loading, error } = useServiceApi();
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    options: [],
    services: [],
  });

  const handleCheckboxChange = (id: number, name: string, price: number) => {
    const isSelected = selectedItems.options.includes(id);

    let updatedOptions: number[];
    let updatedServices: { name: string; price: number }[];

    if (isSelected) {
      // Si el servicio ya está seleccionado, lo eliminamos
      updatedOptions = selectedItems.options.filter((option) => option !== id);
      updatedServices = selectedItems.services.filter(
        (service) => service.name !== name,
      );
    } else {
      // Si no, lo agregamos
      updatedOptions = [...selectedItems.options, id];
      updatedServices = [...selectedItems.services, { name, price }];
    }

    // Actualizamos el estado
    setSelectedItems({
      options: updatedOptions,
      services: updatedServices,
    });

    // Llamamos a la función `onChange` con los datos actualizados
    onChange({
      options: updatedOptions,
      services: updatedServices,
    });
  };

  const handleUncheckAll = () => {
    setSelectedItems({
      options: [],
      services: [],
    });
    onChange({
      options: [],
      services: [],
    });
  };

  const handleIsDelete = (value: boolean) => {
    if (handleDelete) {
      handleDelete(value);
    }
  };
  return {
    handleCheckboxChange,
    services,
    loading,
    error,
    handleUncheckAll,
    handleIsDelete,
    selectedItems,
  };
};
