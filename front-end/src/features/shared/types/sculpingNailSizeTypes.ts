export interface SculpingNailSize {
  size_name: string;
  base_price: number;
}

export type SculpingNailSizeCreate = SculpingNailSize;

export interface SculpingNailSizeUpdate extends SculpingNailSize {
  size_id: number;
}

export interface SculpingNailSizeResponse extends SculpingNailSize {
  size_id: number;
}
