import { useState } from "react";
import ContainerSection from "../components/ContainerSection.tsx";
import Input from "../components/Input.tsx";
import SubTittle from "../components/SubTittle.tsx";
import useClients from "../hooks/useClient.ts";

interface Client {
  name: string;
  phone_number: number;
  client_id: number;
  created_at: string;
}

interface ClientInfoProps {
  onChange: (data: { name: string; phone: string }) => void;
  is_required: boolean;
}

const ClientInfo: React.FC<ClientInfoProps> = ({ onChange, is_required }) => {
  const [clientInfo, setClientInfo] = useState({
    name: "",
    phone: "",
  });
  const { clientAll } = useClients();
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const convertirATitulo = (texto: string): string => texto.toLowerCase().split(' ').map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(' ');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "name") {
      const filtered = clientAll.filter((client) =>
        client.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredClients(filtered);
      setShowSuggestions(value.length > 0);
    }
    const updatedInfo = { ...clientInfo, [name]: value };
    setClientInfo(updatedInfo);
    onChange(updatedInfo);
  };

  const handleClientSelect = (client: Client) => {
    const updatedInfo = { ...clientInfo, name: client.name };
    setClientInfo(updatedInfo); // Actualizar el estado local
    onChange(updatedInfo); // Notificar al componente padre
    setShowSuggestions(false); // Ocultar el panel de sugerencias  };
  }

  return (
    <ContainerSection>
      <SubTittle text={"Informacion del Cliente"} />
      <div style={{ position: "relative" }}>
        <Input
          type={"text"}
          placeholder={"Pedro Martinez"}
          label_text={"Nombre del cliente"}
          id={"name"}
          name={"name"}
          is_required={is_required}
          value={clientInfo.name}
          onChange={handleInputChange}
        />
        {showSuggestions && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              zIndex: 1000,
              maxHeight: "150px",
              overflowY: "auto",
            }}
          >
            {filteredClients.map((client) => (
              <div
                key={client.client_id}
                style={{ padding: "10px", cursor: "pointer" }}
                onClick={() => handleClientSelect(client)}
              >
                {convertirATitulo(client.name)}
              </div>
            ))}
          </div>
        )}
      </div>
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
