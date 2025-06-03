export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  discount: number;
  image: string;
  isOwned: boolean;
}

export type ProductMap = Record<string, Product>;
