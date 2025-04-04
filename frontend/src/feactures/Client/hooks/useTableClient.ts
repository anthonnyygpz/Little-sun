import { useCallback, useEffect, useState } from "react";
import { Client } from "../../../types/client.types";
import { clientService } from "../../../api/clientService";
import { useAuth } from "../../../contexts/AuthContext/hooks/useAuth";
import { toast } from "react-toastify/unstyled";

export const useTableClient = () => {
  const [listClients, setListClients] = useState<Client[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { isAuthenticated, token } = useAuth();

  const listClient = useCallback(async () => {
    if (isAuthenticated && token) {
      setLoading(true);
      try {
        const data = await clientService.listClient(token);
        setListClients(data);
      } catch (error) {
        console.error("Error to list client", error);
        setError("Error to list client.");
      } finally {
        setLoading(false);
      }
    }
  }, [isAuthenticated, token]);

  const deleteClient = useCallback(
    async (id: number) => {
      if (isAuthenticated && token) {
        setLoading(true);
        try {
          await toast.promise(clientService.deleteClient(token, id), {
            success: "Se elimino exitosamente.",
            pending: "Cargando...",
            error: "Error al borrar.",
          });
          listClient();
        } catch (error) {
          console.error(error);
          setError("Error to delete client.");
        } finally {
          setLoading(false);
        }
      }
    },
    [listClient, isAuthenticated, token],
  );

  useEffect(() => {
    listClient();
  }, [listClient]);

  return { listClients, error, loading, deleteClient };
};
