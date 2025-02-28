export interface Appointment {
  quote_id: number;
  client_id?: number;
  nail_size_id?: number;
  name?: string;
  phone_number?: number;
  total_amount?: number;
  designs?: number[];
  services?: number[];
  status: string;
}

export interface AppointmentCreate {
  client_id?: number;
  nail_size_id?: number;
  total_amount?: number;
}

export type AppintmentUpdate = Appointment;

export interface AppointmentResponse extends Appointment {
  created_at?: string;
  size_name?: string;
}
