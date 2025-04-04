import { useState, useCallback, useMemo, useEffect } from "react";
import { ClientResponse } from "../../../types/clientTypes.ts";
import { ClientService } from "../../../../client";

interface UseClientInfoProps {
  onChange: (data: { name: string; phone: string }) => void;
}

export const useClientInfo = ({ onChange }: UseClientInfoProps) => {
  const [clientInfo, setClientInfo] = useState({ name: "", phone: "" });
  const { clientAll } = ClientService();
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Función para convertir texto a título
  const transformToTitle = useCallback((texto: string): string => {
    return texto
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, []);

  // Filtrado de clientes
  const filteredClients = useMemo(() => {
    if (!clientAll) return [];
    return clientAll.filter((client) =>
      client.name.toLowerCase().includes(clientInfo.name.toLowerCase()),
    );
  }, [clientAll, clientInfo.name]);

  // Manejo de cambios en los inputs
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const updatedInfo = { ...clientInfo, [name]: value };
      setClientInfo(updatedInfo);
      onChange(updatedInfo);

      if (name === "name") {
        setShowSuggestions(value.length > 0);
      }
    },
    [clientInfo, onChange],
  );

  // Selección de un cliente de la lista de sugerencias
  const handleClientSelect = useCallback(
    (client: ClientResponse) => {
      const updatedInfo = { ...clientInfo, name: client.name };
      setClientInfo(updatedInfo);
      onChange(updatedInfo);
      setShowSuggestions(false);
    },
    [clientInfo, onChange],
  );

  const handleClickOutside = () => {
    setShowSuggestions(false);
  };

  useEffect(() => {
    handleClickOutside();
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return {
    clientInfo,
    showSuggestions,
    filteredClients,
    handleInputChange,
    handleClientSelect,
    transformToTitle,
  };
};
