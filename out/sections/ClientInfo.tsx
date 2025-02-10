import { useState } from "react";
import ContainerSection from "../components/ContainerSection.tsx";
import Input from "../components/Input.tsx";
import SubTittle from "../components/SubTittle.tsx";

interface ClientInfoProps {
  onChange: (data: { name: string; phone: string }) => void;
}

const ClientInfo: React.FC<ClientInfoProps> = ({ onChange }) => {
  const [clientInfo, setClientInfo] = useState({
    name: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedInfo = { ...clientInfo, [name]: value };
    setClientInfo(updatedInfo);
    onChange(updatedInfo);
  };
  return (
    <ContainerSection>
      <SubTittle text={"Informacion del Cliente"} />
      <Input
        type={"text"}
        placeholder={"Pedro Martinez"}
        label_text={"Nombre del usuario"}
        id={"name"}
        name={"name"}
        is_required={true}
        value={clientInfo.name}
        onChange={handleInputChange}
      />
      <Input
        type={"tel"}
        placeholder={"111 111 1111"}
        label_text={"Numero de telefono (Opcional)"}
        id={"phone"}
        name={"phone"}
        is_required={false}
        value={clientInfo.phone}
        onChange={handleInputChange}
      />
    </ContainerSection>
  );
};

export default ClientInfo;
