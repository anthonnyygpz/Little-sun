import { useState, useCallback, useMemo, useEffect } from "react";
import { clientService } from "../../../api/clientService";
import { Client, ClientInfo } from "../../../types/client.types";
import { useAuth } from "../../../contexts/AuthContext/hooks/useAuth";
import { useFieldValidation } from "../../../hooks/useFieldValidation";

interface useCardClientInfoProps {
  onChange: (data: ClientInfo) => void;
}

export const useCardClientInfo = ({ onChange }: useCardClientInfoProps) => {
  // constants
  const [clients, setClients] = useState<Client[]>([]);
  const [loadingListClient, setLoadingListClient] = useState<boolean>(true);
  const [errorListClient, setErrorListClient] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [formClient, setFormClient] = useState<ClientInfo>({
    name: "",
    phone: "",
  });

  // module
  const { isAuthenticated, token } = useAuth();
  const { filterFieldValue } = useFieldValidation();

  // Filtrado de clientes
  const filteredClients = useMemo(() => {
    if (!clients) return [];
    return clients.filter((client) =>
      client.name.toLowerCase().includes(formClient.name.toLowerCase()),
    );
  }, [clients, formClient.name]);

  // Manejo de cambios en los inputs
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      const filteredValue = filterFieldValue(name, value);

      const updatedInfo = { ...formClient, [name]: filteredValue };
      setFormClient(updatedInfo);
      onChange(updatedInfo);

      if (name === "name") {
        setShowSuggestions(value.length > 0);
      }
    },
    [formClient, onChange, filterFieldValue],
  );

  // Selección de un cliente de la lista de sugerencias
  const clientSelect = useCallback(
    (client: Client) => {
      const updatedInfo = { ...formClient, name: client.name };
      setFormClient(updatedInfo);
      onChange(updatedInfo);
      setShowSuggestions(false);
    },
    [formClient, onChange],
  );

  // Manejo de ocultar el showSuggestions
  const handleClickOutside = () => setShowSuggestions(false);

  // Apis
  // Lista los clientes
  const listClient = async () => {
    if (isAuthenticated && token) {
      try {
        const data = await clientService.listClient(token);
        setClients(data);
      } catch (error) {
        console.error(error);
        setErrorListClient("Error to list client");
      } finally {
        setLoadingListClient(false);
      }
    }
  };

  useEffect(() => {
    listClient();
    handleClickOutside();
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isAuthenticated, token]);

  return {
    clients,
    showSuggestions,
    filteredClients,
    handleInputChange,
    clientSelect,
    loadingListClient,
    errorListClient,
    formClient,
    setFormClient,
  };
};
