import { useState } from "react";
import { SculpingNailSizeService } from "../../../../sculpingNailSize";

interface useSculpingNailSizeProps {
  onChange: (data: {
    selectedValue: string;
    id: number;
    price: number;
  }) => void;
  handleDelete?: (is_delete: boolean) => void;
}
export const useSculpingSize = ({
  onChange,
  handleDelete,
}: useSculpingNailSizeProps) => {
  const { sculpingSizes, loading, error, getAllSculpingSize } =
    SculpingNailSizeService();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (data: {
    selectedValue: string;
    id: number;
    price: number;
  }) => {
    setSelectedOption(data.selectedValue); // Solo actualiza el valor seleccionado
    onChange(data); // Pasa el objeto con el valor y el id
  };

  const handleUncheckAll = () => {
    setSelectedOption(""); // Reinicia el valor seleccionado
    onChange({ selectedValue: "", id: 0, price: 0 }); // Pasa el objeto con valores por defecto
  };

  const handleIsDelete = (value: boolean) => {
    if (handleDelete) {
      handleDelete(value);
    }
  };

  return {
    sculpingSizes,
    loading,
    error,
    handleOptionChange,
    SculpingNailSizeService,
    handleUncheckAll,
    handleIsDelete,
    selectedOption,
    getAllSculpingSize,
  };
};
