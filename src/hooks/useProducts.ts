import { IProduct } from "@/interfaces";
import { create } from "zustand";

interface ProductWithQuantity {
  quantity: number;
  product: IProduct;
  variant: string; // Propiedad para identificar la variante, como "color".
}

interface ProductStore {
  products: ProductWithQuantity[];
  addProduct: (product: IProduct, variant: string) => void;
  removeProduct: (productId: number, variant: string) => void;
  deleteProduct: (productId: number, variant: string) => void;
}

export const useProducts = create<ProductStore>((set) => ({
  products: [],

  addProduct: (product, variant) =>
    set((state) => {
      const existingProductIndex = state.products.findIndex(
        (p) => p.product.id === product.id && p.variant === variant
      );

      if (existingProductIndex !== -1) {
        // Si la combinación de producto y variante ya está en el carrito, aumenta su cantidad.
        const updatedProducts = [...state.products];
        updatedProducts[existingProductIndex].quantity += 1;

        return { products: updatedProducts };
      } else {
        // Si la combinación no está, agrégala con cantidad 1.
        return {
          products: [...state.products, { quantity: 1, product, variant }],
        };
      }
    }),

  removeProduct: (productId, variant) =>
    set((state) => {
      const existingProductIndex = state.products.findIndex(
        (p) => p.product.id === productId && p.variant === variant
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

      return state; // No hacer nada si no se encuentra.
    }),

  deleteProduct: (productId, variant) =>
    set((state) => ({
      products: state.products.filter(
        (p) => !(p.product.id === productId && p.variant === variant)
      ),
    })),
}));
