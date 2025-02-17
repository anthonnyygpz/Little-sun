import { useState } from "react";
import Button from "../components/Button";
import ContainerSection from "../components/ContainerSection";
import SubTittle from "../components/SubTittle";
import useServices from "../hooks/useServices";
import { CheckboxList } from "../components/Checkbox";


interface ServicesProps {
  onChange: (data: {
    options: number[];
    services: { name: string; price: number }[];
  }
  ) => void;
}

interface SelectedItems {
  options: number[];
  services: { name: string; price: number; }[];
}

const Services: React.FC<ServicesProps> = ({ onChange }) => {
  const { services, loading, error } = useServices();
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    options: [], services: [],
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ContainerSection>
      <SubTittle text="Servicios" />
      {services.map(({ service_id, service_name, price }) => (
        <div key={service_id}>
          <CheckboxList
            idKey={service_id}
            name={service_name}
            selectedOptions={selectedItems.options}
            handleCheckboxChange={() =>
              handleCheckboxChange(service_id, service_name, price)
            }
          />
        </div>
      ))}
      <Button text="Desmarcar" onClick={handleUncheckAll} />
    </ContainerSection>
  );
};

export default Services;
