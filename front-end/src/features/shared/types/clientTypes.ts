export interface Client {
  name: string;
  phone_number: number;
}

export type ClientCreate = Client;

export interface ClientUpdate {
  name?: string;
  phone_number?: string;
}

export interface ClientResponse extends Client {
  client_id: number;
  created_at: string;
}
