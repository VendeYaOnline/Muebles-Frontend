import { useQuery } from "@tanstack/react-query";
import {
  getAttributes,
  getCarousel,
  getCategories,
  getFeaturedProducts,
  getImages,
  getProducts,
  getProductsByCategory,
  getSales,
  getUsers,
} from "./request";

export const useQueryAttribute = (currentPage: number, search: string) => {
  const validPage = currentPage > 0 ? currentPage : 1;
  return useQuery({
    queryKey: ["attributes", validPage],
    queryFn: () => getAttributes(validPage, search),
    refetchOnWindowFocus: false,
    //staleTime: 1000 * 60 * 5,
    enabled: currentPage > 0,
  });
};

export const useQueryProducts = (currentPage: number, search: string) => {
  const validPage = currentPage > 0 ? currentPage : 1;
  return useQuery({
    queryKey: ["products", validPage],
    queryFn: () => getProducts(validPage, search),
    refetchOnWindowFocus: false,
    //staleTime: 1000 * 60 * 5,
    enabled: currentPage > 0,
  });
};

export const useQueryProductsSearch = (currentPage: number, search: string) => {
  const validPage = currentPage > 0 ? currentPage : 1;
  return useQuery({
    queryKey: ["products-search", validPage],
    queryFn: () => getProducts(validPage, search),
    refetchOnWindowFocus: false,
    //staleTime: 1000 * 60 * 5,
    enabled: currentPage > 0,
  });
};

export const useQueryProductsSearchByCategory = (
  currentPage: number,
  search: string,
  categories: { id: number; name: string }[]
) => {
  const validPage = currentPage > 0 ? currentPage : 1;
  return useQuery({
    queryKey: ["products-search-categories", validPage],
    queryFn: () => getProductsByCategory(validPage, search, categories),
    refetchOnWindowFocus: false,
    //staleTime: 1000 * 60 * 5,
    enabled: currentPage > 0,
  });
};

export const useQueryImages = (
  currentPage: number,
  search: string,
  limit: number
) => {
  const validPage = currentPage > 0 ? currentPage : 1;
  return useQuery({
    queryKey: ["images", validPage],
    queryFn: () => getImages(validPage, search, limit),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    enabled: currentPage > 0,
  });
};

export const useQueryFeaturedProducts = (
  currentPage: number,
  search: string
) => {
  const validPage = currentPage > 0 ? currentPage : 1;
  return useQuery({
    queryKey: ["featured-products", validPage],
    queryFn: () => getFeaturedProducts(validPage, search),
    refetchOnWindowFocus: false,
    //staleTime: 1000 * 60 * 5,
    enabled: currentPage > 0,
  });
};

// * USERS

export const useQueryUsers = (currentPage: number, search: string) => {
  const validPage = currentPage > 0 ? currentPage : 1;
  return useQuery({
    queryKey: ["users", validPage],
    queryFn: () => getUsers(validPage, search),
    refetchOnWindowFocus: false,
    //staleTime: 1000 * 60 * 5,
    enabled: currentPage > 0,
  });
};

export const useQuerySales = (
  currentPage: number,
  query: { date: Date | null; status: string }
) => {
  const validPage = currentPage > 0 ? currentPage : 1;
  return useQuery({
    queryKey: ["sales", validPage],
    queryFn: () => getSales(validPage, query),
    refetchOnWindowFocus: false,
    //staleTime: 1000 * 60 * 5,
    enabled: currentPage > 0,
  });
};

export const useQueryCategories = (currentPage: number, search: string) => {
  const validPage = currentPage > 0 ? currentPage : 1;
  return useQuery({
    queryKey: ["categories", validPage],
    queryFn: () => getCategories(validPage, search),
    refetchOnWindowFocus: false,
    //staleTime: 1000 * 60 * 5,
    enabled: currentPage > 0,
  });
};

export const useQueryCarousel = (currentPage: number, search: string) => {
  const validPage = currentPage > 0 ? currentPage : 1;
  return useQuery({
    queryKey: ["carousel", validPage],
    queryFn: () => getCarousel(validPage, search),
    refetchOnWindowFocus: false,
    //staleTime: 1000 * 60 * 5,
    enabled: currentPage > 0,
  });
};
