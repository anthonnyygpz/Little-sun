import { useState } from "react";
import useSculpingNailSizeApi from "./useSculpingNailSizeApi.ts";

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
  const [selectedOption, setSelectedOption] = useState<string>("");
  const { sculpingSizes, loading, error } = useSculpingNailSizeApi();

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
    handleUncheckAll,
    handleIsDelete,
    selectedOption,
  };
};
