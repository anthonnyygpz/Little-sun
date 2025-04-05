export type NailService = {
  service_id: number;
  service_name: string;
  base_price: number;
};

export type CreateNailService = {
  service_name: string;
  base_price: number;
};

export type SelectedIdsService = {
  ids: number[];
  nailServiceData: { service_name: string; price: number }[];
};
