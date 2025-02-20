export interface Services {
  service_name: string;
  description?: string;
  price: number;
}

export type ServiceCreate = Services;

export interface ServiceUpdate extends Services {
  service_id: number;
}

export interface ServiceResponse extends Services {
  service_id: number;
}
