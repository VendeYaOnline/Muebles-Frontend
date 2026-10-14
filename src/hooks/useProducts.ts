import { IProduct } from "@/interfaces";
import { create } from "zustand";

export interface ProductWithQuantity {
  quantity: number;
  product: IProduct;
  /** Hex del color elegido (compatibilidad con el carrito anterior). */
  variant: string;
  /** Variante exacta (color + talla, etc.) que descuenta el inventario al vender. */
  variantKey?: string;
  /** Texto legible de la variante: "Rojo · M". */
  variantLabel?: string;
  /** Unidades disponibles de la variante al agregarla (tope del carrito). */
  available?: number;
  /** Producto vendido como set: variante elegida para cada pieza. */
  bundleItems?: { variantKey: string; variantLabel: string }[];
}

export interface VariantChoice {
  variantKey?: string;
  variantLabel?: string;
  available?: number;
  bundleItems?: { variantKey: string; variantLabel: string }[];
}

/** Identidad de una línea del carrito: producto + variante exacta (o color). */
export const lineKey = (productId: number, variant: string, variantKey?: string) =>
  `${productId}::${variantKey ?? variant}`;

interface ProductStore {
  products: ProductWithQuantity[];
  totalQuantity: number;
  totalDiscount: number;
  addProduct: (product: IProduct, variant: string, choice?: VariantChoice) => void;
  removeProduct: (productId: number, variant: string, variantKey?: string) => void;
  deleteProduct: (productId: number, variant: string, variantKey?: string) => void;
  clearProducts: () => void;
}

export const useProducts = create<ProductStore>((set) => ({
  products: [],
  totalQuantity: 0,
  totalDiscount: 0,

  addProduct: (product, variant, choice) =>
    set((state) => {
      const key = lineKey(product.id, variant, choice?.variantKey);
      const existingProductIndex = state.products.findIndex(
        (p) => lineKey(p.product.id, p.variant, p.variantKey) === key
      );

      let updatedProducts;

      if (existingProductIndex !== -1) {
        updatedProducts = [...state.products];
        const line = updatedProducts[existingProductIndex];
        // No se puede pedir más de lo disponible en la variante.
        if (line.available === undefined || line.quantity < line.available) {
          line.quantity += 1;
        }
      } else {
        updatedProducts = [
          ...state.products,
          {
            quantity: 1,
            product,
            variant,
            variantKey: choice?.variantKey,
            variantLabel: choice?.variantLabel,
            available: choice?.available,
            bundleItems: choice?.bundleItems,
          },
        ];
      }

      return {
        products: updatedProducts,
        totalQuantity: updatedProducts.reduce((sum, p) => sum + p.quantity, 0),
        totalDiscount: calculateTotalDiscount(updatedProducts),
      };
    }),

  removeProduct: (productId, variant, variantKey) =>
    set((state) => {
      const key = lineKey(productId, variant, variantKey);
      const existingProductIndex = state.products.findIndex(
        (p) => lineKey(p.product.id, p.variant, p.variantKey) === key
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

  deleteProduct: (productId, variant, variantKey) =>
    set((state) => {
      const key = lineKey(productId, variant, variantKey);
      const updatedProducts = state.products.filter(
        (p) => lineKey(p.product.id, p.variant, p.variantKey) !== key
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
