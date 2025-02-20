import { useState } from "react";
import useSculpingNailSizeApi from "./useSculpingNailSizeApi";

interface useSculpingNailSizeProps {
  onChange: (data: { selectedValue: string; id: number }) => void;
  handleDelete?: (is_delete: boolean) => void;
}
export const useSculpingSize = ({
  onChange,
  handleDelete,
}: useSculpingNailSizeProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const { sculpingSizes, loading, error } = useSculpingNailSizeApi();

  const handleOptionChange = (selectedValue: string, id: number) => {
    setSelectedOption(selectedValue); // Solo actualiza el valor seleccionado
    onChange({ selectedValue, id }); // Pasa el objeto con el valor y el id
  };

  const handleUncheckAll = () => {
    setSelectedOption(""); // Reinicia el valor seleccionado
    onChange({ selectedValue: "", id: 0 }); // Pasa el objeto con valores por defecto
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
