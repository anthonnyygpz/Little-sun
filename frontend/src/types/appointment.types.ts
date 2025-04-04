export type Appointment = {
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
  created_at?: string;
  size_name?: string;
};

export type CreateAppointment = {
  client_name: string;
  phone_number: string;
  nail_size_id: number;
  nail_designs: number[];
  nail_services: number[];
  date_appointment: string;
  appointment_time: string;
};
