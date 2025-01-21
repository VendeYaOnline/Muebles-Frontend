import {
  Carousel,
  CarouselResponse,
  Categories,
  ProductFeatured,
  ProductFind,
  ValuesAttributes,
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
      `/get-products-store?page=${page}&search=${search}&${categoryParams}`
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

export const getCategories = async () => {
  const result = (await axiosConfig.get<Categories>("/get-categories-store"))
    .data;
  return result;
};
