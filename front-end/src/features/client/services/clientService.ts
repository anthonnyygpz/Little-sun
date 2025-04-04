import {
  ClientCreate,
  ClientResponse,
  ClientUpdate,
} from "../../shared/types/clientTypes.ts";
import {
  fetchByNameClient,
  createClient,
  fetchClient,
  deleteClient,
  updateClient,
} from "../../../lib/enpoints/clientApi.ts";
import { useEffect, useState } from "react";
import LocalStorageItem from "../../shared/constants/localStorage.ts";

const ClientService = () => {
  const [clients, setClients] = useState<ClientResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [clientAll, setClientAll] = useState<ClientResponse[]>();
  const [loadingClientAll, setLoadingClientAll] = useState<boolean>(true);
  const [errorClientAll, setErrorClientAll] = useState<string | null>(null);

  const { CLIENT_CACHE, APPOINTMENT_CACHE } = LocalStorageItem();

  const addClient = async (newClient: ClientCreate) => {
    try {
      setLoading(true);
      const createdClient = await createClient(newClient);
      localStorage.removeItem(CLIENT_CACHE);
      return createdClient;
    } catch (error) {
      setError("Failed to create client");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllClients = async () => {
    try {
      // Intentar obtener datos del caché primero
      const cachedData = localStorage.getItem(CLIENT_CACHE);
      const now = Date.now();

      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);

        // Verificar si el caché está fresco
        if (now - timestamp < 5 * 60 * 1000) {
          setClientAll(data);
          return; // Salir temprano si usamos caché válido
        }
      }

      // Si no hay caché válido, hacer la solicitud
      const freshData = await fetchClient();
      setClientAll(freshData);

      // Actualizar el caché con marca de tiempo
      try {
        const cacheEntry = JSON.stringify({
          data: freshData,
          timestamp: now,
        });
        localStorage.setItem(CLIENT_CACHE, cacheEntry);
      } catch (cacheError) {
        console.error("Error al guardar en caché:", cacheError);
        // No romper el flujo por errores de caché
      }
    } catch (error) {
      setErrorClientAll("Failed to fetch clients");
      console.error(error);

      try {
        const cachedData = localStorage.getItem("client_cache");
        if (cachedData) {
          const { data } = JSON.parse(cachedData);
          setClientAll(data);
          setErrorClientAll("Using cached data (connection issue)");
        }
      } catch (fallbackError) {
        console.error("Fallback cache failed:", fallbackError);
      }
    } finally {
      setLoadingClientAll(false);
    }
  };

  const getByNameClient = async (name: string) => {
    try {
      setLoading(true);
      const data = await fetchByNameClient(name);
      setClients(data);
      return data;
    } catch (error) {
      setError("Failed to  clients");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateClients = async (client_id: number, editClient: ClientUpdate) => {
    try {
      localStorage.removeItem(CLIENT_CACHE);
      return await updateClient(client_id, editClient);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClients = async (id: number) => {
    try {
      setLoading(true);
      const data = await deleteClient(id);
      localStorage.removeItem(CLIENT_CACHE);
      localStorage.removeItem(APPOINTMENT_CACHE);
      getAllClients();
      return data;
    } catch (error) {
      setError("Failed to create client");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllClients();
  }, [getAllClients]);

  return {
    clients,
    clientAll,
    loading,
    loadingClientAll,
    error,
    errorClientAll,
    getByNameClient,
    addClient,
    getAllClients,
    deleteClients,
    updateClients,
  };
};

export default ClientService;
