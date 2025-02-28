import { useCallback, useState } from "react";
import Card from "../card";
import Subtitle from "../subTitle";
import Input from "../input";

interface EditDesignCardProps {
  onChange: (data: { design_name: string; price: string }) => void;
  defaultService?: { design_name: string; price: number };
}

const EditDesignCard: React.FC<EditDesignCardProps> = ({
  onChange,
  defaultService: defaultDesign,
}) => {
  const [design, setFormData] = useState({
    design_name: String(defaultDesign?.design_name),
    price: String(defaultDesign?.price),
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const updateInfo = { ...design, [name]: value };
      setFormData(updateInfo);
      onChange(updateInfo);
    },
    [design, onChange],
  );

  return (
    <Card>
      <Subtitle title="Datos del Servicio" />
      <Input
        type="text"
        placeholder="Nombre del diseño"
        labelText="Nombre"
        id="design_name"
        name="design_name"
        value={design.design_name}
        onChange={handleInputChange}
      />
      <Input
        type="number"
        placeholder="Precio del diseño"
        labelText="Precio"
        id="price"
        name="price"
        value={design.price}
        onChange={handleInputChange}
      />
    </Card>
  );
};

export default EditDesignCard;
