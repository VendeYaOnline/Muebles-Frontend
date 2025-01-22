import { IProduct } from "@/interfaces";
import { create } from "zustand";

interface ProductWithQuantity {
  quantity: number;
  product: IProduct;
}

interface ProductStore {
  products: ProductWithQuantity[];
  addProduct: (product: IProduct) => void;
  removeProduct: (productId: number) => void;
}

export const useProducts = create<ProductStore>((set) => ({
  products: [],

  addProduct: (product) =>
    set((state) => {
      const existingProductIndex = state.products.findIndex(
        (p) => p.product.id === product.id
      );

      if (existingProductIndex !== -1) {
        // Si el producto ya está en la lista, aumenta su cantidad.
        const updatedProducts = [...state.products];
        updatedProducts[existingProductIndex].quantity += 1;

        return { products: updatedProducts };
      } else {
        // Si el producto no está en la lista, agrégalo con cantidad 1.
        return {
          products: [...state.products, { quantity: 1, product }],
        };
      }
    }),

  removeProduct: (productId) =>
    set((state) => {
      const existingProductIndex = state.products.findIndex(
        (p) => p.product.id === productId
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = [...state.products];
        const productToRemove = updatedProducts[existingProductIndex];

        if (productToRemove.quantity > 1) {
          // Reduce la cantidad si es mayor que 1.
          updatedProducts[existingProductIndex].quantity -= 1;
        } else {
          // Si la cantidad es 1, remueve el producto de la lista.
          updatedProducts.splice(existingProductIndex, 1);
        }

        return { products: updatedProducts };
      }

      return state; // No hacer nada si el producto no existe.
    }),
}));
