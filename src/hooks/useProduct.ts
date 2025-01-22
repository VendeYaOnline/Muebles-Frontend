import { IProduct } from "@/interfaces";
import { create } from "zustand";

interface Product {
  product?: IProduct;
  setProduct: (product: IProduct) => void;
}

export const useProduct = create<Product>((set) => ({
  product: undefined,
  setProduct: (product) => set((_state) => ({ product: product })),
}));
