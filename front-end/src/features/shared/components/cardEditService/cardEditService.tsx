import { useCallback, useState } from "react";
import Card from "../card";
import Subtitle from "../subTitle";
import Input from "../input";

interface EditServiceCardProps {
  onChange: (data: { service_name: string; price: string }) => void;
  defaultService?: { service_name: string; price: number };
}

const CardEditService: React.FC<EditServiceCardProps> = ({
  onChange,
  defaultService,
}) => {
  const [service, setFormData] = useState({
    service_name: String(defaultService?.service_name),
    price: String(defaultService?.price),
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const updateInfo = { ...service, [name]: value };
      setFormData(updateInfo);
      onChange(updateInfo);
    },
    [service, onChange],
  );

  return (
    <Card>
      <Subtitle title="Datos del Servicio" />
      <Input
        type="text"
        placeholder="Nombre del servicio"
        labelText="Nombre"
        id="service_name"
        name="service_name"
        value={service.service_name}
        onChange={handleInputChange}
      />
      <Input
        type="number"
        placeholder="Precio del servicio"
        labelText="Precio"
        id="price"
        name="price"
        value={service.price}
        onChange={handleInputChange}
      />
    </Card>
  );
};

export default CardEditService;
