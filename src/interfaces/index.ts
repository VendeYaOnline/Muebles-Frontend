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

/** Valor de un atributo: cadena, o color como { name, value } / { name, color }. */
export type AttributeValue = string | { name: string; value?: string; color?: string };

/** Atributo del producto (snapshot guardado por el panel). */
export interface ProductAttribute {
  id: string;
  attribute_name: string;
  attribute_type: string;
  /** Si genera variantes de inventario. */
  inventory?: boolean;
  value: AttributeValue[];
}

export interface VariantPart {
  attribute_id: string;
  attribute_name: string;
  value_key: string;
  value_label: string;
}

/** Combinación de valores con sus unidades disponibles. */
export interface ProductVariant {
  variant_key: string;
  combination: VariantPart[];
  quantity: number;
}

export interface IProduct {
  id: number;
  image_product: string;
  title: string;
  price: string;
  attributes: ValuesAttributes;
  product_attributes?: ProductAttribute[] | null;
  variants?: ProductVariant[];
  quantity?: number | null;
  stock?: boolean;
  /** Piezas por set cuando se vende como "Set x N"; null = por unidad. */
  bundle_size?: number | null;
  bundle_item_label?: string | null;
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
  /** El backend devuelve el objeto por tipo; versiones antiguas lo enviaban como texto JSON. */
  attributes: string | ValuesAttributes;
  product_attributes?: ProductAttribute[] | null;
  variants?: ProductVariant[];
  quantity?: number | null;
  stock?: boolean;
  bundle_size?: number | null;
  bundle_item_label?: string | null;
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
    /** Id del producto y variante vendida: el backend descuenta el inventario con ellos. */
    id?: number;
    variant_key?: string;
    variant_label?: string;
    /** Piezas de un set: el backend descuenta una unidad de cada una por set vendido. */
    bundle_items?: { variant_key: string; variant_label: string }[];
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

interface Product {
  name: string;
  image: string;
  price: string;
  quantity: string;
}

export interface Transaction {
  products: Product[];
  bank: string;
  account_number: string;
  account_type: string;
  id: string;
  to: string;
  from: string;
  client: string;
  total: string;
  date: string;
}
