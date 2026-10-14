import { useEffect, useMemo, useState } from "react";
import type { IProduct, ProductVariant } from "@/interfaces";
import {
  type VariantSelection,
  defaultSelection,
  findVariant,
  getInventoryAttributes,
  selectionLabel,
} from "@/lib/variants";

export interface BundlePiece {
  variantKey: string;
  variantLabel: string;
}

/** Unidades de cada variante ya reservadas por las demás piezas del set. */
const reservedExcept = (product: IProduct, selections: VariantSelection[], skip: number) => {
  const reserved = new Map<string, number>();
  selections.forEach((selection, index) => {
    if (index === skip) return;
    const variant = findVariant(product, selection);
    if (variant) reserved.set(variant.variant_key, (reserved.get(variant.variant_key) ?? 0) + 1);
  });
  return reserved;
};

/** Copia del producto con el stock de cada variante menos lo reservado. */
export const withReservedStock = (product: IProduct, reserved: Map<string, number>): IProduct => ({
  ...product,
  variants: (product.variants ?? []).map(
    (variant): ProductVariant => ({
      ...variant,
      quantity: Math.max(0, variant.quantity - (reserved.get(variant.variant_key) ?? 0)),
    }),
  ),
});

/**
 * Producto vendido como set ("Set x N"): el comprador elige color/talla de
 * cada una de las N piezas. Las piezas pueden repetir combinación mientras
 * haya unidades: cada pieza descuenta una unidad de su variante.
 */
export const useBundleSelection = (product: IProduct | undefined, resetKey?: unknown) => {
  const size = product?.bundle_size ?? 0;
  const [selections, setSelections] = useState<VariantSelection[]>([]);

  useEffect(() => {
    if (!product || size < 2) {
      setSelections([]);
      return;
    }
    // Cada pieza arranca con la primera combinación con stock, descontando
    // lo que ya reservaron las anteriores.
    const next: VariantSelection[] = [];
    for (let index = 0; index < size; index += 1) {
      const reserved = reservedExcept(product, next, -1);
      next.push(defaultSelection(withReservedStock(product, reserved)));
    }
    setSelections(next);
  }, [product, size, resetKey]);

  return useMemo(() => {
    if (!product || size < 2) {
      return {
        isBundle: false,
        size: 0,
        label: "unidad",
        attributes: [],
        pieces: [],
        setValue: () => {},
        canAdd: false,
        choice: undefined,
      };
    }

    const attributes = getInventoryAttributes(product);
    const pieces = selections.map((selection, index) => {
      const reserved = reservedExcept(product, selections, index);
      const productForPiece = withReservedStock(product, reserved);
      const variant = findVariant(productForPiece, selection);
      return {
        index,
        selection,
        productForPiece,
        variant,
        available: variant?.quantity ?? 0,
        label: selectionLabel(product, selection),
      };
    });

    const complete = pieces.length === size && pieces.every((piece) => piece.variant);
    const canAdd = complete && pieces.every((piece) => piece.available > 0);

    // Sets completos que se pueden armar con el stock actual (tope del carrito).
    const usage = new Map<string, number>();
    for (const piece of pieces) {
      if (piece.variant) usage.set(piece.variant.variant_key, (usage.get(piece.variant.variant_key) ?? 0) + 1);
    }
    const setsAvailable = complete
      ? Math.min(
          ...Array.from(usage, ([key, count]) => {
            const stock = product.variants?.find((v) => v.variant_key === key)?.quantity ?? 0;
            return Math.floor(stock / count);
          }),
        )
      : 0;

    const itemLabel = product.bundle_item_label?.trim() || "Unidad";
    const bundleItems: BundlePiece[] = pieces.map((piece) => ({
      variantKey: piece.variant?.variant_key ?? "",
      variantLabel: piece.label,
    }));

    return {
      isBundle: true,
      size,
      label: itemLabel,
      attributes,
      pieces,
      setValue: (index: number, attributeId: string, valueKey: string) =>
        setSelections((prev) =>
          prev.map((selection, i) =>
            i === index ? { ...selection, [attributeId]: valueKey } : selection,
          ),
        ),
      canAdd,
      choice: canAdd
        ? {
            variantKey: bundleItems.map((piece) => piece.variantKey).sort().join("+"),
            variantLabel: bundleItems
              .map((piece, index) => `${itemLabel} ${index + 1}: ${piece.variantLabel}`)
              .join(" | "),
            available: setsAvailable,
            bundleItems,
          }
        : undefined,
    };
  }, [product, size, selections]);
};
