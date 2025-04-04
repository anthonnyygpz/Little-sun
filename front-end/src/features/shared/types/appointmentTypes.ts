export interface Appointment {
  appointment_id: number;
  user_id: number;
  client_id?: number;
  nail_size_id?: number;
  client_name?: string;
  phone_number?: number;
  total_amount?: number;
  nail_designs?: string;
  nail_services?: number;
  status: string;
}

export interface AppointmentCreate {
  client_name: string;
  phone_number: string;
  nail_size_id: number;
  nail_designs: number[];
  nail_services: number[];
  user_id: number;
}

export type AppintmentUpdate = Appointment;

export interface AppointmentResponse extends Appointment {
  created_at?: string;
  size_name?: string;
}
