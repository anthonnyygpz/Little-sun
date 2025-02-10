import { Client, ClientCreate, ClientUpdate } from "../../models/Client.modesls.ts";
import apiClient from "../apiClient.ts";

export const fetchClient = async () => {
  try {
    const response = await apiClient.get("/clients/all")
    return response.data;
  } catch {
    throw new Error("Failded to fetch clients");
  }
}

export const fetchByNameClient = async (name: string) => {
  try {
    const response = await apiClient.get("/clients/?name_in=" + name)
    return response.data;
  } catch {
    throw new Error("Failded to fetch clients");
  }
}

export const createClient = async (client: ClientCreate): Promise<Client> => {
  try {
    const response = await apiClient.post("/clients/", client)
    return response.data
  } catch {
    throw new Error("Failed to create client");
  }
}

export const updateClient = async (client: ClientUpdate) => {
  try {
    const response = await apiClient.put("/clients/update", client)
    return response.data
  } catch {
    throw new Error("Failed to update client");
  }
}

export const deleteClient = async (id: number) => {
  try {
    const response = await apiClient.delete("/clients/delete?client_id=" + id)
    return response.data
  } catch {
    throw new Error("Failed to delete client");
  }

}
