import { ProductFeatured, ProductFind, ValuesAttributes } from "@/interfaces";
import { axiosConfig } from "./config";

// * PRODUCTOS

export const getFeatured = async (page: number, search: string = "") => {
  const result = (
    await axiosConfig.get<ProductFeatured>(
      `/get-featured-products-stock?page=${page}&search=${search}`
    )
  ).data;

  return result
};

export const getProducts = async (page: number, search: string = "") => {
  const result = (
    await axiosConfig.get<ProductFind>(
      `/get-products-store?page=${page}&search=${search}`
    )
  ).data;

  return {
    ...result,
    products: result.products.map((i) => ({
      ...i,
      attributes: JSON.parse(i.attributes) as ValuesAttributes,
    })),
  };
};
