import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./request";

export const useQueryProducts = (currentPage: number, search: string) => {
  const validPage = currentPage > 0 ? currentPage : 1;
  return useQuery({
    queryKey: ["products", validPage],
    queryFn: () => getProducts(validPage, search),
    enabled: currentPage > 0,
  });
};
