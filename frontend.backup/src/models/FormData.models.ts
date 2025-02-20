export interface FormData {
  clientInfo: { name: string; phone: number };
  nailSize: { selectedValue: string; id: number };
  services: {
    options: number[];
    services: { name: string; price: number }[];
  };
  designs: {
    options: number[];
    designs: { name: string; price: number }[];
  };
  totalPrice: 0;
}
