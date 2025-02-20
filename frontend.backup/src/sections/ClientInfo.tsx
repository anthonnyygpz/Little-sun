import React from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Subtitle from "../components/SubTitle";
import { useClientInfo } from "../hooks/useClientInfoSection";

interface ClientInfoProps {
  onChange: (data: { name: string; phone: string }) => void;
  inputRequired?: boolean;
}

const ClientInfo: React.FC<ClientInfoProps> = ({
  onChange,
  inputRequired = false,
}) => {
  const {
    clientInfo,
    showSuggestions,
    filteredClients,
    handleInputChange,
    handleClientSelect,
    transformToTitle,
  } = useClientInfo({ onChange });

  return (
    <Card>
      <Subtitle title="Información del Cliente" />

      <div style={{ position: "relative" }}>
        <Input
          type="text"
          placeholder="Nombre(s) Apellidos"
          labelText="Nombre del cliente *"
          id="name"
          name="name"
          value={clientInfo.name}
          onChange={handleInputChange}
          inputRequired={inputRequired}
        />

        {showSuggestions && (
          <div className="suggestions-container">
            {filteredClients.map((client) => (
              <div
                key={client.client_id}
                className="suggestion-item"
                onClick={() => handleClientSelect(client)}
              >
                {transformToTitle(client.name)}
              </div>
            ))}
          </div>
        )}
      </div>

      <Input
        type="tel"
        placeholder="631 *** ****"
        labelText="Número de teléfono (Opcional)"
        id="phone"
        name="phone"
        value={clientInfo.phone}
        onChange={handleInputChange}
      />
    </Card>
  );
};

export default ClientInfo;
