export interface NailDesign {
  design_name: string;
  base_price: number;
}

export type NailDesignCreate = NailDesign;

export interface NailDesignUpdate extends NailDesign {
  design_id: number;
}

export interface NailDesignResponse extends NailDesign {
  design_id: number;
}
