export type SculpingNailSize = {
  size_id: number;
  size_name: string;
  base_price: number;
};
export type CreateSculpingNailSize = {
  size_name: string;
  base_price: number;
};

export type SculpingNailSizeForm = {
  size_id: number;
  nailLength: string;
  price: number;
};
