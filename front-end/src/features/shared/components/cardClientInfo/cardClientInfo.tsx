import React from "react";
import { Card } from "../card.tsx";
import Input from "../input.tsx";
import Subtitle from "../subTitle.tsx";
import { useClientInfo } from "./hooks/useCardClientInfo.ts";
import { ClientResponse } from "../../types/clientTypes.ts";
import Label from "../label.tsx";

interface CardClientInfoProps {
  onChange: (data: { name: string; phone: string }) => void;
  inputRequired?: boolean;
}

const CardClientInfo: React.FC<CardClientInfoProps> = ({
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

      <div className="flex flex-col">
        <div className="relative">
          <Label
            className="text-gray-700"
            text="Nombre del usuario."
            id="user"
          />
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
            <div className="absolute top-full left-0 right-0 bg-white hover:bg-gray-300 border border-gray-300 z-1000 max-h-10px cursor-pointer rounded p-2">
              {filteredClients.map((client: ClientResponse) => (
                <div
                  key={client.client_id}
                  onClick={() => handleClientSelect(client)}
                >
                  {transformToTitle(client.name)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <br />
      <Label className="text-gray-700" text="Numero de telefono" id="phone" />
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

export default CardClientInfo;
