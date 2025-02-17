import useDesignApi from "./useDesignApi";
import { useState } from "react";

interface DesignProps {
  onChange: (data: {
    options: number[];
    designs: { name: string; price: number }[];
  }) => void;
  handleDelete?: (value: boolean) => void;
}

interface SelectedItems {
  options: number[];
  designs: { name: string; price: number }[];
}
export const useDesigns = ({ onChange, handleDelete }: DesignProps) => {
  const { designs, loading, error } = useDesignApi();
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    options: [],
    designs: [],
  });

  const handleCheckboxChange = (id: number, name: string, price: number) => {
    const isSelected = selectedItems.options.includes(id);
    let updatedOptions: number[];
    let updatedDesigns: { name: string; price: number }[];

    if (isSelected) {
      updatedOptions = selectedItems.options.filter((option) => option !== id);
      updatedDesigns = selectedItems.designs.filter(
        (design) => design.name !== name,
      );
    } else {
      updatedOptions = [...selectedItems.options, id];
      updatedDesigns = [...selectedItems.designs, { name, price }];
    }

    const newSelectedItems = {
      options: updatedOptions,
      designs: updatedDesigns,
    };
    setSelectedItems(newSelectedItems);
    onChange(newSelectedItems); // Notificar al componente padre
  };
  const handleUncheckAll = () => {
    setSelectedItems({
      options: [],
      designs: [],
    });
    onChange({
      options: [],
      designs: [],
    });
  };

  const handleIsDelete = (value: boolean) => {
    if (handleDelete) {
      handleDelete(value);
    }
  };
  return {
    designs,
    loading,
    error,
    handleCheckboxChange,
    handleUncheckAll,
    handleIsDelete,
    selectedItems,
  };
};
