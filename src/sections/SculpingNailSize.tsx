import { useState } from "react";
import ContainerSection from "../components/ContainerSection";
import RadioButtonGroup from "../components/RadioButton";
import useSculpingNailSizes from "../hooks/useSculpingNailSize.ts";
import SubTittle from "../components/SubTittle";
import Button from "../components/Button.tsx";
import Label from "../components/Label.tsx";
import AlertDialog from "../components/AlertDialog.tsx";

interface SculpingNailSizeProps {
  onChange: (data: { selectedValue: string; id: number }) => void;
  defaultSculpingSize?: string;
  is_delete?: (is_delete: boolean) => void;
}

const SculpingNailSize: React.FC<SculpingNailSizeProps> = ({ onChange, defaultSculpingSize = "", is_delete }) => {
  const [selectedOption, setSelectedOption] = useState<string>(""); // Cambiado a string
  const { sculpingSizes, loading, error, } = useSculpingNailSizes();

  const handleOptionChange = (selectedValue: string, id: number) => {
    setSelectedOption(selectedValue); // Solo actualiza el valor seleccionado
    onChange({ selectedValue, id }); // Pasa el objeto con el valor y el id
  };

  const handleUncheckAll = () => {
    setSelectedOption(""); // Reinicia el valor seleccionado
    onChange({ selectedValue: "", id: 0 }); // Pasa el objeto con valores por defecto
  };

  const handleIsDelete = (value: boolean) => {
    is_delete(value)
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ContainerSection>
      <SubTittle text={"Tamaño de esculpido"} />
      {sculpingSizes.map((sculpingSize) => (
        <div key={sculpingSize.size_id}>
          <RadioButtonGroup
            idKey={sculpingSize.size_id}
            name={sculpingSize.size_name}
            value={sculpingSize.size_name}
            selectedValue={selectedOption} // Pasa el valor seleccionado como string
            onChange={(selectedValue, id) =>
              handleOptionChange(selectedValue, id)
            }
          />
        </div>
      ))}
      {defaultSculpingSize !== "" ?
        <Label className="label" text={"Datos: " + defaultSculpingSize} />
        : ""
      }
      <div className="wrapper between">
        <Button text={"Desmarcar"} onClick={handleUncheckAll} />
        {defaultSculpingSize !== "" ?
          <AlertDialog
            nameText={defaultSculpingSize}
            nameSection="Tipo de esculpido"
            onChange={handleIsDelete} />
          : ""
        }
      </div>
    </ContainerSection>
  );
};

export default SculpingNailSize;
