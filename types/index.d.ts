export type Product = {
  id: number;
  name: string;
  picture: string;
  stock: number;
  price: number;
  quantity?: number;
};

export type Invoice = {
  invoice_number: string;
  customer_name: string;
  salesperson_name: string;
  product_sold: Product[];
  invoice_notes: string;
  total_amount: number;
  invoice_date: string;
};
