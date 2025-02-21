export interface CarouselResponse {
  carousels: Carousel[];
}

export interface Carousel {
  id: number;
  name: string;
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

export interface IProduct {
  id: number;
  image_product: string;
  title: string;
  price: string;
  attributes: ValuesAttributes;
  description: string;
  discount_price: string;
  specs: string[];
  feature: string;
  reference: string;
  discount: number;
  images: string[];
  Categories: [
    {
      id: number;
      name: string;
    }
  ];
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
  Categories: [
    {
      id: number;
      name: string;
    }
  ];
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

export interface Sale {
  first_name: string;
  last_name: string;
  phone: string;
  department: string;
  city: string;
  address: string;
  additional_info: string;
  email: string;
  id_number: string;
  products: {
    image_product: string;
    title: string;
    price: string;
    discount_price: string;
    discount: number;
    images: string[];
    quantity: number;
    purchase_total: string;
  }[];
  quantity: string;
  status: string;
  purchase_date: Date;
  order_number: string;
  type_purchase: string;
  payment_method: string;
}
