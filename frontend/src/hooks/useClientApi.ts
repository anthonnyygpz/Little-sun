import {
  ClientCreate,
  ClientResponse,
  ClientUpdate,
} from "../models/client.modesls.ts";
import {
  fetchByNameClient,
  createClient,
  fetchClient,
  deleteClient,
  updateClient,
} from "../api/enpoints/clientApi.ts";
import { useEffect, useState } from "react";

const useClientApi = () => {
  const [clients, setClients] = useState<ClientResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [clientAll, setClientAll] = useState<ClientResponse[]>();
  const [loadingClientAll, setLoadingClientAll] = useState<boolean>(true);
  const [errorClientAll, setErrorClientAll] = useState<string | null>(null);

  const addClient = async (newClient: ClientCreate) => {
    try {
      setLoading(true);
      const createdClient = await createClient(newClient);
      return createdClient;
    } catch (error) {
      setError("Failed to create client");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getAll = async () => {
    try {
      setLoadingClientAll(true);
      const response = await fetchClient();
      setClientAll(response);
    } catch {
      setErrorClientAll("Failed to fetch clients");
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

  const updateClients = async (editClient: ClientUpdate) => {
    try {
      return await updateClient(editClient);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClients = async (id: number) => {
    try {
      setLoading(true);
      const deletedClients = await deleteClient(id);
      return deletedClients;
    } catch (error) {
      setError("Failed to create client");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return {
    clients,
    clientAll,
    loading,
    loadingClientAll,
    error,
    errorClientAll,
    getByNameClient,
    addClient,
    getAll,
    deleteClients,
    updateClients,
  };
};

export default useClientApi;
