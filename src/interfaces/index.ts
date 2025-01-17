export interface CarouselResponse {
  carousels: Carousel[];
}

export interface Carousel {
  id:       number;
  name:     string;
  products: ProductsResponse[];
}



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
  discount_price: string;
  specs: string[];
  feature: string;
  reference: string;
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

export interface ProductFeatured {
  products: { id: number; product_id: number; product: ProductsResponse }[];
  total: number;
  grandTotal: number;
  page: number;
  totalPages: number;
}

export interface Categories {
  categories: { id: number; name: string }[];
}
