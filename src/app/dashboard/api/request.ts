import {
  AttributeData,
  AttributeFind,
  AttributeUpdated,
  Carousel,
  CategoriesFind,
  ContactRequest,
  FeaturedProductRequest,
  ImagesFind,
  ProductRequest,
  Sale,
  SaleFind,
  UserData,
  UserRequest,
} from "@/app/dashboard/interfaces";
import { axiosConfig } from "./config";
import { formatDate } from "../functions";

// * ATRIBUTOS

export const getAttributes = async (page: number, search: string = "") => {
  return (
    await axiosConfig.get<AttributeFind>(
      `/get-attributes?page=${page}&search=${search}`
    )
  ).data;
};

export const createAttribute = async (data: AttributeData) => {
  return axiosConfig.post("/create-attribute", data);
};

export const updatedAttribute = async ({ id, ...data }: AttributeUpdated) => {
  return axiosConfig.put(`/updated-attribute/${id}`, data);
};

export const deleteAttribute = async (idElement: number) => {
  return axiosConfig.delete(`/delete-attribute/${idElement}`);
};

export const deleteContact = async (idElement: number) => {
  return axiosConfig.delete(`/delete-contact/${idElement}`);
};

// * PRODUCTOS

export const getProducts = async (page: number, search: string = "") => {
  const result = (
    await axiosConfig.get<ProductRequest>(
      `/get-products?page=${page}&search=${search}`
    )
  ).data;

  return result;
};

export const getProductsByCategory = async (
  page: number,
  search: string = "",
  categories: { id: number; name: string }[]
) => {
  const categoryParams = categories
    .map((category) => `categoryId=${category.id}`)
    .join("&");
  const result = (
    await axiosConfig.get<ProductRequest>(
      `/get-products-category?page=${page}&search=${search}&${categoryParams}`
    )
  ).data;

  return result;
};

export const createProduct = async (data: FormData) => {
  return axiosConfig.post("/create-product", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updatedProduct = async ({
  id,
  data,
}: {
  id: number;
  data: FormData;
}) => {
  return axiosConfig.put(`/updated-product/${id}`, data);
};

export const deleteProduct = async (idElement: number) => {
  return axiosConfig.delete(`/delete-product/${idElement}`);
};

//* IMAGES

export const uploadImages = async (data: FormData) => {
  return axiosConfig.post("/upload-images", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getImages = async (
  page: number,
  search: string,
  limit: number
) => {
  const result = (
    await axiosConfig.get<ImagesFind>(
      `/get-images?page=${page}&search=${search}&limit=${limit}`
    )
  ).data;
  return result;
};

export const deleteImage = async (idElement: string) => {
  return axiosConfig.delete(`/delete-image/${idElement}`);
};

// * PRODUCTOS DESTACADOS

export const getFeaturedProducts = async (
  page: number,
  search: string = ""
) => {
  const result = (
    await axiosConfig.get<FeaturedProductRequest>(
      `/get-featured-products?page=${page}&search=${search}`
    )
  ).data;

  return result;
};

export const createFeaturedProduct = async (product_id: number) => {
  return axiosConfig.post("/create-featured-product", { product_id });
};

export const deleteFeaturedProduct = async (idElement: number) => {
  return axiosConfig.delete(`/delete-featured-product/${idElement}`);
};

// * USERS

export const getUsers = async (page: number, search: string = "") => {
  const result = (
    await axiosConfig.get<UserRequest>(
      `/get-users?page=${page}&search=${search}`
    )
  ).data;

  return result;
};

export const getContacts = async (page: number, search: string = "") => {
  const result = (
    await axiosConfig.get<ContactRequest>(
      `/get-contacts?page=${page}&search=${search}`
    )
  ).data;

  return result;
};

export const createUser = async (data: UserData) => {
  return axiosConfig.post("/create-user", data);
};

export const updatedUser = async ({
  id,
  data,
}: {
  id: number;
  data: { username: string; email: string; role: string };
}) => {
  return axiosConfig.put(`/updated-user/${id}`, data);
};

export const deleteUser = async (idElement: number) => {
  return axiosConfig.delete(`/delete-user/${idElement}`);
};

export const loginUser = async (data: { email: string; password: string }) => {
  return axiosConfig.post("/login-user", data);
};

export const verifyToken = async () => {
  return axiosConfig.get("/verify-token");
};

export const createSales = async (data: Sale) => {
  return axiosConfig.post("/create-sale", data);
};

export const getSales = async (
  page: number,
  query: { date: Date | null; status: string }
) => {
  return (
    await axiosConfig.get<SaleFind>(
      `/get-sales?page=${page}&date=${
        query.date ? formatDate(query.date) : ""
      }&status=${query.status}`
    )
  ).data;
};

export const deleteSale = async (idElement: number) => {
  return axiosConfig.delete(`/delete-sale/${idElement}`);
};

export const updatedSale = async (data: { id: number; status: string }) => {
  return axiosConfig.put(`/updated-sale/${data.id}`, { status: data.status });
};

export const createCategory = async (name: string) => {
  return axiosConfig.post("/create-category", { name });
};

export const getCategories = async (page: number, search: string = "") => {
  const result = (
    await axiosConfig.get<CategoriesFind>(
      `/get-categories?page=${page}&search=${search}`
    )
  ).data;

  return result;
};

export const deleteCategory = async (idElement: number) => {
  return axiosConfig.delete(`/delete-category/${idElement}`);
};

export const updatedCategory = async (data: { id: number; name: string }) => {
  return axiosConfig.put(`/updated-category/${data.id}`, { name: data.name });
};

export const createCarousel = async (data: {
  name: string;
  idsProducts: number[];
}) => {
  return axiosConfig.post("/create-carousel", data);
};

export const updatedCarousel = async (data: {
  id: number;
  name: string;
  idsProducts: number[];
}) => {
  return axiosConfig.put(`/updated-carousel/${data.id}`, data);
};

export const getCarousel = async (page: number, search: string = "") => {
  const result = (
    await axiosConfig.get<Carousel>(
      `/get-carousels?page=${page}&search=${search}`
    )
  ).data;

  return result;
};

export const deleteCarousel = async (idElement: number) => {
  const result = (await axiosConfig.delete(`/delete-carousel/${idElement}`))
    .data;

  return result;
};
