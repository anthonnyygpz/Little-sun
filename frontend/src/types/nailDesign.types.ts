export type NailDesign = {
  design_id: number;
  design_name: string;
  base_price: number;
};

export type CreateNailDesign = {
  design_name: string;
  base_price: number;
};

export type SelectedIdsDesign = {
  ids: number[];
  nailDesignData: { design_name: string; price: number }[];
};
