import { useConvertToTitle } from "../../hooks/useConvertToTitle";
import { Client, ClientInfo } from "../../types/client.types";
import { Input } from "../common/Input";
import { Label } from "../common/Label";
import { SubTitle } from "../common/SubTitle";
import { useCardClientInfo } from "./hooks/useCardClientInfo";

interface CardClientInfo {
  onChange: (data: ClientInfo) => void;
}

export const CardClientInfo: React.FC<CardClientInfo> = ({ onChange }) => {
  const {
    filteredClients,
    showSuggestions,
    formClient,
    clientSelect,
    handleInputChange,
  } = useCardClientInfo({ onChange });
  const { transformToTitle } = useConvertToTitle();

  return (
    <div className="mb-8">
      <SubTitle> Información Personal</SubTitle>

      <div className="space-y-4">
        <div className="relative">
          <Label htmlFor="name">Nombre Completo</Label>
          <Input
            value={transformToTitle(formClient.name)}
            placeholder="Nombre(s) Apellidos"
            onChange={handleInputChange}
            autoComplete="off"
            required={true}
            type="text"
            name="name"
          />

          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 bg-white  border border-gray-300 z-1000 max-h-10px cursor-pointer rounded p-2">
              {filteredClients.map((client: Client) => (
                <div
                  className="hover:bg-gray-300 px-2 py-1"
                  onClick={() => clientSelect(client)}
                  key={client.client_id}
                >
                  {transformToTitle(client.name)}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Teléfono de Contacto</Label>
          <Input
            onChange={handleInputChange}
            placeholder="631 *** ****"
            value={formClient.phone}
            required={true}
            name="phone"
            type="tel"
          />
        </div>
      </div>
    </div>
  );
};
