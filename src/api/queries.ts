import { QueryClient, useQuery } from "@tanstack/react-query";
import { getProducts } from "./request";
import { ProductFind } from "@/interfaces";

// Crear una instancia de QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Evita que los datos se vuelvan "stale" inmediatamente
      retry: 1, // Reintenta una vez en caso de fallo
      refetchOnWindowFocus: false, // Evita refetch automático al cambiar de pestaña
    },
  },
});

export const useQueryProducts = (currentPage: number, search: string) => {
  const validPage = currentPage > 0 ? currentPage : 1;
  return useQuery({
    queryKey: ["products", validPage],
    queryFn: () => getProducts(validPage, search),
    staleTime: 1000 * 60 * 5, // Evita que los datos se vuelvan "stale" inmediatamente
    retry: 1, // Reintenta una vez en caso de fallo
    refetchOnWindowFocus: false, // Evita refetch automático al cambiar de pestaña
  });
};
