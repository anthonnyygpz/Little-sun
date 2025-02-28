import { useState } from "react";
import ContainerSection from "../card.tsx";
import RadioButtonGroup from "../radioButton.tsx";
import SubTittle from "../subTitle.tsx";
import Button from "../button.tsx";

interface StatuProps {
  onChange: (data: { selectedValue: string; id: number }) => void;
}

const Statu: React.FC<StatuProps> = ({ onChange }) => {
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
            onChange={(data: {
              selectedValue: string;
              id: number;
              price: number;
            }) => handleOptionChange(data.selectedValue, data.id)}
          />
          {/* <RadioButtonGroup */}
          {/*   idKey={index} */}
          {/*   name={statu} */}
          {/*   value={statu} */}
          {/*   selectedValue={selectedOption} */}
          {/*   onChange={(selectedValue: string, id: number) => */}
          {/*     handleOptionChange(selectedValue, id) */}
          {/*   } */}
          {/* /> */}
        </div>
      ))}

      <Button text={"Eliminar"} onClick={handleUncheckAll} />
    </ContainerSection>
  );
};

export default Statu;
