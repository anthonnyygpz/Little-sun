export interface Quote {
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

export interface QuoteCreate {
  client_id?: number;
  nail_size_id?: number;
  total_amount?: number;
}

export type QuoteUpdate = Quote;

export interface QuoteResponse extends Quote {
  created_at?: string;
  size_name?: string;
}
