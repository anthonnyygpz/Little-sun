import { useState } from "react";
import ContainerSection from "../components/card.tsx";
import RadioButtonGroup from "../components/radioButton.tsx";
import SubTittle from "../components/subTitle.tsx";
import Button from "../components/Buttons/button.tsx";

interface StatuProps {
  onChange: (data: { selectedValue: string; id: number }) => void;
}

const Status: React.FC<StatuProps> = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>(""); // Cambiado a string
  const status = ["Pending", "Completed", "Cancelled"];

  const handleOptionChange = (selectedValue: string, id: number) => {
    setSelectedOption(selectedValue); // Solo actualiza el valor seleccionado
    onChange({ selectedValue, id }); // Pasa el objeto con el valor y el id
  };

  const handleUncheckAll = () => {
    setSelectedOption(""); // Reinicia el valor seleccionado
    onChange({ selectedValue: "", id: 0 }); // Pasa el objeto con valores por defecto
  };
  return (
    <ContainerSection>
      <SubTittle title="Esatus" />
      {status.map((statu, index) => (
        <div key={index}>
          <RadioButtonGroup
            idKey={index}
            name={statu}
            value={statu}
            selectedValue={selectedOption}
            onChange={(selectedValue, id) =>
              handleOptionChange(selectedValue, id)
            }
          />
        </div>
      ))}

      <Button text={"Eliminar"} onClick={handleUncheckAll} />
    </ContainerSection>
  );
};

export default Status;
