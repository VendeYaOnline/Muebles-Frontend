import {
  CarouselResponse,
  Categories,
  IProduct,
  ProductFeatured,
  ProductFind,
  ProductsResponse,
  Sale,
  Transaction,
} from "@/interfaces";
import { axiosConfig } from "./config";

// * PRODUCTOS

export const getFeatured = async (page: number, search: string = "") => {
  const result = (
    await axiosConfig.get<ProductFeatured>(
      `/get-featured-products-stock?page=${page}&search=${search}`
    )
  ).data;

  return result;
};

export const getCarousels = async () => {
  const result = (
    await axiosConfig.get<CarouselResponse>("/get-carousels-store")
  ).data;

  return result.carousels;
};

export const getProductsByCategory = async (
  page: number,
  search: string = "",
  categoryId: number[]
) => {
  const categoryParams = categoryId
    .map((category) => `categoryId=${category}`)
    .join("&");
  const result = (
    await axiosConfig.get<ProductFind>(
      `/get-products-store?page=${
        categoryId.length ? 1 : page
      }&search=${search}&${categoryParams}`
    )
  ).data;

  return {
    ...result,
    products: result.products.map((i) => ({
      ...i,
      attributes: JSON.parse(i.attributes),
    })),
  };
};

export const getCategories = async () => {
  const result = (await axiosConfig.get<Categories>("/get-categories-store"))
    .data;
  return result;
};

export const getProductById = async (id?: number) => {
  const result = (
    await axiosConfig.get<{ product: ProductsResponse }>(
      `/get-product-store/${id}`
    )
  ).data;
  const product: IProduct = {
    ...result.product,
    attributes: JSON.parse(result.product.attributes),
  };
  return product;
};

export const createPreference = async (
  products: any[],
  user: {
    first_name: string;
    last_name: string;
    phone: string;
    department: string;
    city: string;
    address: string;
    additional_info: string;
    email: string;
    id_number: string;
  }
) => {
  return (
    await axiosConfig.post<{ init_point: string }>("/create-preference", {
      products,
      user,
    })
  ).data;
};

export const saveData = async (
  email: string,
  products: {
    quantity: number;
    variant: string;
    product: {
      image_product: string;
      title: string;
      price: string;
      discount_price: string;
      discount: number;
      images: string[];
      purchase_total: string;
      quantity: number;
    };
  }[]
) => {
  const totalQuantity = products.reduce((sum, item) => sum + item.quantity, 0);
  await fetch(
    "https://guardar-compras-temporales-production.up.railway.app/api/save-data",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: email,
        data: {
          products: products.map((a) => a.product),
          quantity: totalQuantity,
        },
      }),
    }
  );
};

export const createSale = async (sale: Sale) => {
  return await axiosConfig.post("/create-bank-transfer-sale", sale);
};

export const createTransfer = async (transaction: Transaction) => {
  await fetch("https://app-email-production.up.railway.app/transfer-progress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      color: "#6439ff",
      ...transaction,
      logo: "https://muebles-electrodomesticos-del-meta-tvy0g5xm53zbkhw.s3.us-east-2.amazonaws.com/logo.png",
    }),
  });
};
