import { useQuery } from "@tanstack/react-query";
import { getFeatured, getCategories, getProductsByCategory } from "./request";

export const useQueryFeatured = (currentPage: number, search: string) => {
  const validPage = currentPage > 0 ? currentPage : 1;
  return useQuery({
    queryKey: ["featured", validPage],
    queryFn: () => getFeatured(validPage, search),
    staleTime: 1000 * 60 * 5, // Evita que los datos se vuelvan "stale" inmediatamente
    retry: 1, // Reintenta una vez en caso de fallo
    refetchOnWindowFocus: false, // Evita refetch automático al cambiar de pestaña
  });
};

export const useQueryProductsByCategory = (
  currentPage: number,
  search: string,
  categoryId: number
) => {
  const validPage = currentPage > 0 ? currentPage : 1;
  return useQuery({
    queryKey: ["products", validPage],
    queryFn: () => getProductsByCategory(validPage, search, categoryId),
    staleTime: 1000 * 60 * 5, // Evita que los datos se vuelvan "stale" inmediatamente
    retry: 1, // Reintenta una vez en caso de fallo
    refetchOnWindowFocus: false, // Evita refetch automático al cambiar de pestaña
  });
};

export const useQueryCategoriesStore = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    staleTime: 1000 * 60 * 5, // Evita que los datos se vuelvan "stale" inmediatamente
    retry: 1, // Reintenta una vez en caso de fallo
    refetchOnWindowFocus: false, // Evita refetch automático al cambiar de pestaña
  });
};
