import { ProductFind, ValuesAttributes } from "@/interfaces";
import { axiosConfig } from "./config";

// * PRODUCTOS

export const getProducts = async (page: number, search: string = "") => {
  const result = (
    await axiosConfig.get<ProductFind>(
      `/get-products?page=${page}&search=${search}`
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
