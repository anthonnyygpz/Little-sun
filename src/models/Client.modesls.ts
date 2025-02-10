export interface Client {
  name: string,
  phone_number: number,
  client_id: number,
  created_at: string,
}

export interface ClientCreate {
  name: string,
  phone_number?: number,
}


export interface ClientUpdate {
  client_id: number,
  name?: string,
  phone_number?: number,
}

