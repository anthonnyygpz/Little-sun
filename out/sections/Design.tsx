import { useState } from "react";
import Button from "../components/Button";
import { CheckboxList } from "../components/Checkbox";
import ContainerSection from "../components/ContainerSection";
import SubTittle from "../components/SubTittle";
import useDesigns from "../hooks/useDesign.ts";

interface DesignProps {
  onChange: (data: {
    options: number[];
    designs: { name: string; price: number }[];
  }) => void;
}

interface SelectedItems {
  options: number[];
  designs: { name: string; price: number }[];
}

const Design: React.FC<DesignProps> = ({ onChange }) => {
  const { designs, loading, error } = useDesigns();
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ContainerSection>
      <SubTittle text="Diseños" />
      {designs.map(({ design_id, design_name, price }) => (
        <div key={design_id}>
          <CheckboxList
            idKey={design_id}
            name={design_name}
            selectedOptions={selectedItems.options}
            handleCheckboxChange={() =>
              handleCheckboxChange(design_id, design_name, price)
            }
          />
        </div>
      ))}
      <Button text="Desmarcar" onClick={handleUncheckAll} />
    </ContainerSection>
  );
};

export default Design;
