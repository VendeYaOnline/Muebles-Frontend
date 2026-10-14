import { useEffect, useMemo, useState } from "react";
import type { IProduct } from "@/interfaces";
import {
  type VariantSelection,
  defaultSelection,
  findVariant,
  getInventoryAttributes,
  selectedColorHex,
  selectionLabel,
} from "@/lib/variants";

/**
 * Selección de variante (color, talla...) de un producto. Si el producto no
 * tiene variantes, `hasVariants` es false y el resto queda vacío: se sigue
 * usando el selector de color heredado.
 */
export const useVariantSelection = (product: IProduct | undefined, resetKey?: unknown) => {
  const [selection, setSelection] = useState<VariantSelection>({});

  useEffect(() => {
    setSelection(product ? defaultSelection(product) : {});
  }, [product, resetKey]);

  return useMemo(() => {
    if (!product) {
      return {
        hasVariants: false,
        attributes: [],
        selection,
        setValue: () => {},
        variant: undefined,
        available: 0,
        canAdd: false,
        label: "",
        colorHex: "",
        choice: undefined,
      };
    }
    const attributes = getInventoryAttributes(product);
    const variant = findVariant(product, selection);
    const available = variant?.quantity ?? 0;
    const setValue = (attributeId: string, valueKey: string) =>
      setSelection((prev) => ({ ...prev, [attributeId]: valueKey }));
    return {
      hasVariants: attributes.length > 0,
      attributes,
      selection,
      setValue,
      variant,
      available,
      canAdd: attributes.length === 0 || available > 0,
      label: selectionLabel(product, selection),
      colorHex: selectedColorHex(product, selection),
      /** Datos que se guardan en la línea del carrito. */
      choice: variant
        ? {
            variantKey: variant.variant_key,
            variantLabel: selectionLabel(product, selection),
            available,
          }
        : undefined,
    };
  }, [product, selection]);
};
