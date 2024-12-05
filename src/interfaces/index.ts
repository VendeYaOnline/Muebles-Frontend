export interface ValuesAttributes {
  Talla: string[];
  Peso: string[];
  Dimensión: string[];
  Género: string[];
  Mililitro: string[];
  Color: {
    name: string;
    color: string;
  }[];
}

export interface ProductsResponse {
  id: number;
  image_product: string;
  title: string;
  price: string;
  attributes: string;
  description: string;
  feature: string;
  discount: number;
  images: string[];
}

export interface ProductFind {
  products: ProductsResponse[];
  total: number;
  grandTotal: number;
  page: number;
  totalPages: number;
}
