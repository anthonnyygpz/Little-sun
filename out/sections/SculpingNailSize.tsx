import { useState } from "react";
import ContainerSection from "../components/ContainerSection";
import RadioButtonGroup from "../components/RadioButton";
import useSculpingNailSizes from "../hooks/useSculpingNailSizes.ts";
import SubTittle from "../components/SubTittle";
import Button from "../components/Button.tsx";

interface SculpingNailSizeProps {
  onChange: (selectedValue: string) => void;
}

const SculpingNailSize: React.FC<SculpingNailSizeProps> = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const { sculpingSizes, loading, error } = useSculpingNailSizes();

  const handleOptionChange = (selectedValue: string) => {
    setSelectedOption(selectedValue);
    onChange(selectedValue);
  };

  const handleUncheckAll = () => {
    setSelectedOption("")
    onChange("")
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ContainerSection>
      <SubTittle text={"Tamaño de esculpido"} />
      <RadioButtonGroup
        options={sculpingSizes}
        name="sculping"
        onChange={handleOptionChange}
        selectedValue={selectedOption}
      />
      <Button text={"Eliminar"} onClick={handleUncheckAll} />
    </ContainerSection>
  );
};

export default SculpingNailSize;
