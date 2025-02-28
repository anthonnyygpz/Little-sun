export interface Design {
  design_name: string;
  price: number;
}

export type DesignCreate = Design;

export interface DesignUpdate extends Design {
  design_id: number;
}

export interface DesignResponse extends Design {
  design_id: number;
}
