export interface Attribute {
  color: { name: string; color: string }[];
  size: string[];
  weight: string[];
  dimension: string[];
  mililitir: string[];
  gender: string[];
}

export interface AttributeData {
  attribute_name: string;
  attribute_type: string;
  value: any[];
}

export interface UserData {
  username: string;
  email: string;
  role: string;
}

export type AttributeValues = string[] | { name: string; value: string }[];

export interface AttributeUpdated {
  id: number;
  attribute_name: string;
  attribute_type: string;
  value: AttributeValues;
}

export interface ProductsResponse {
  id: number;
  image_product: string;
  title: string;
  price: string;
  discount_price: string;
  attributes: string;
  description: string;
  reference: string;
  discount: number;
  images: string[];
  specs: string;
}

export interface Products {
  id: number;
  image_product: string;
  quantity: number;
  title: string;
  price: string;
  stock: boolean;
  discount_price: string;
  attributes: string;
  description: string;
  reference: string;
  discount: number;
  images: string[];
  specs: string;
  Categories: { id: number; name: string }[];
}

export interface ProductSale {
  id?: number;
  image_product: string;
  quantity: number;
  title: string;
  price: string;
  discount_price: string;
  discount: number;
  images: string[];
  purchase_total: string;
}
export interface Users {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface AttributeFind {
  attributes: AttributeUpdated[];
  total: number;
  grandTotal: number;
  page: number;
  totalPages: number;
}

export interface Carousel {
  carousels: { id: number; name: string; products: Products[] }[];
  total: number;
  grandTotal: number;
  page: number;
  totalPages: number;
}

export interface SaleFind {
  sales: SaleTable[];
  total: number;
  grandTotal: number;
  page: number;
  totalPages: number;
}

export interface CategoriesFind {
  categories: { id: number; name: string }[];
  total: number;
  grandTotal: number;
  page: number;
  totalPages: number;
}

export interface ImagesFind {
  images: {
    Key: string;
    LastModified: string;
    Size: number;
    Url: string;
  }[];
  total: number;
  grandTotal: number;
  page: number;
  totalPages: number;
}

export interface ProductFind {
  products: ProductsResponse[];
  total: number;
  grandTotal: number;
  page: number;
  totalPages: number;
}

export interface ProductRequest {
  products: Products[];
  total: number;
  grandTotal: number;
  page: number;
  totalPages: number;
}

export interface UserRequest {
  users: Users[];
  total: number;
  grandTotal: number;
  page: number;
  totalPages: number;
}

export interface FeaturedProductRequest {
  products: ProductElement[];
  total: number;
  grandTotal: number;
  page: number;
  totalPages: number;
}

export interface ProductElement {
  id: number;
  product_id: number;
  product: ProductProduct;
}

export interface ProductProduct {
  image_product: string;
  title: string;
  discount_price: string;
  price: string;
  stock: boolean;
  description: string;
  attributes: string;
  specs: string;
  reference: string;
  discount: number;
  images: string[];
}

export type TpeValue =
  | "Color"
  | "Talla"
  | "Peso"
  | "Dimensión"
  | "Mililitro"
  | "Género";

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

export interface Product {
  title: string;
  price: string;
  discount_price: string;
  discount: string;
  description: string;
  image_product: FormData;
  images: string[];
  attributes: string[];
}

export interface ProductTable {
  id: number;
  attributes: string;
  image_product: string;
  title: string;
  price: string;
  discount_price: string;
  description: string;
  reference: string;
  discount: number;
  images: string[];
  stock: boolean;
  specs: string;
  Categories: { id: number; name: string }[];
}

export interface Specs {
  title: string;
  text: string;
}

export interface Sale {
  id_number: string;
  type_purchase: string;
  first_name: string;
  last_name: string;
  phone: string;
  department: string;
  city: string;
  address: string;
  additional_info: string;
  email: string;
  order_number: string;
  products: ProductSale[];
  quantity: string;
  status: string;
  purchase_date: Date | null;
}

export interface SaleTable {
  id: number;
  id_number: string;
  type_purchase: string;
  first_name: string;
  last_name: string;
  phone: string;
  department: string;
  city: string;
  address: string;
  additional_info: string;
  email: string;
  order_number: string;
  products: ProductSale[];
  quantity: string;
  status: string;
  purchase_date: string;
}
