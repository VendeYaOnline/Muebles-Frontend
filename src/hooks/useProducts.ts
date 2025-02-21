import { IProduct } from "@/interfaces";
import { create } from "zustand";

interface ProductWithQuantity {
  quantity: number;
  product: IProduct;
  variant: string;
}

interface ProductStore {
  products: ProductWithQuantity[];
  totalQuantity: number;
  totalDiscount: number;
  addProduct: (product: IProduct, variant: string) => void;
  removeProduct: (productId: number, variant: string) => void;
  deleteProduct: (productId: number, variant: string) => void;
  clearProducts: () => void;
}

export const useProducts = create<ProductStore>((set) => ({
  products: [],
  totalQuantity: 0,
  totalDiscount: 0,

  addProduct: (product, variant) =>
    set((state) => {
      const existingProductIndex = state.products.findIndex(
        (p) => p.product.id === product.id && p.variant === variant
      );

      let updatedProducts;

      if (existingProductIndex !== -1) {
        updatedProducts = [...state.products];
        updatedProducts[existingProductIndex].quantity += 1;
      } else {
        updatedProducts = [
          ...state.products,
          { quantity: 1, product, variant },
        ];
      }

      return {
        products: updatedProducts,
        totalQuantity: updatedProducts.reduce((sum, p) => sum + p.quantity, 0),
        totalDiscount: calculateTotalDiscount(updatedProducts),
      };
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
          updatedProducts[existingProductIndex].quantity -= 1;
        } else {
          updatedProducts.splice(existingProductIndex, 1);
        }

        return {
          products: updatedProducts,
          totalQuantity: updatedProducts.reduce(
            (sum, p) => sum + p.quantity,
            0
          ),
          totalDiscount: calculateTotalDiscount(updatedProducts),
        };
      }

      return state;
    }),

  deleteProduct: (productId, variant) =>
    set((state) => {
      const updatedProducts = state.products.filter(
        (p) => !(p.product.id === productId && p.variant === variant)
      );

      return {
        products: updatedProducts,
        totalQuantity: updatedProducts.reduce((sum, p) => sum + p.quantity, 0),
        totalDiscount: calculateTotalDiscount(updatedProducts),
      };
    }),

  clearProducts: () =>
    set(() => ({
      products: [],
      totalQuantity: 0,
      totalDiscount: 0,
    })),
}));

// Función para convertir precios de formato "$ 9.200.000" a número 9200000
const parsePrice = (price: string): number => {
  return Number(price.replace(/[^0-9]/g, "")) || 0;
};

// Función para calcular el total de ahorro solo en productos con descuento
const calculateTotalDiscount = (products: ProductWithQuantity[]): number => {
  return products.reduce((sum, p) => {
    const originalPrice = parsePrice(p.product.price);
    const discountPrice = parsePrice(p.product.discount_price);
    const discountAmount = originalPrice - discountPrice;

    // Solo sumar si hay descuento
    return p.product.discount > 0 ? sum + p.quantity * discountAmount : sum;
  }, 0);
};
