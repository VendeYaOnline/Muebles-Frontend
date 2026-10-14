import type { IProduct, ProductAttribute, ProductVariant } from "@/interfaces";

/** Selección del comprador: id de atributo → clave del valor (hex para colores). */
export type VariantSelection = Record<string, string>;

const normalizeType = (type: string) =>
  type
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

export const isColorAttribute = (attribute: ProductAttribute) =>
  normalizeType(attribute.attribute_type) === "color";

/** Clave del valor tal como la guarda el panel: hex para colores, texto para el resto. */
export const getValueKey = (value: ProductAttribute["value"][number]) =>
  typeof value === "object" && value !== null
    ? String(value.value ?? value.color ?? "")
    : String(value);

export const getValueLabel = (value: ProductAttribute["value"][number]) =>
  typeof value === "object" && value !== null ? value.name : String(value);

/**
 * Atributos que controlan inventario (los que forman las variantes), con el
 * color primero. Si el producto no trae variantes, no hay nada que elegir.
 */
export const getInventoryAttributes = (product: IProduct): ProductAttribute[] => {
  if (!product.variants?.length) return [];
  const ids = new Set(
    product.variants.flatMap((variant) => variant.combination.map((part) => part.attribute_id)),
  );
  const attributes = (product.product_attributes ?? []).filter((attr) => ids.has(attr.id));
  return [...attributes.filter(isColorAttribute), ...attributes.filter((a) => !isColorAttribute(a))];
};

/** Variante que coincide exactamente con la selección (todas las claves). */
export const findVariant = (
  product: IProduct,
  selection: VariantSelection,
): ProductVariant | undefined =>
  product.variants?.find((variant) =>
    variant.combination.every((part) => selection[part.attribute_id] === part.value_key),
  );

/**
 * Unidades disponibles para un valor dado, teniendo en cuenta lo ya elegido
 * en los demás atributos (para atenuar tallas agotadas de un color, etc.).
 */
export const availableFor = (
  product: IProduct,
  selection: VariantSelection,
  attributeId: string,
  valueKey: string,
) =>
  (product.variants ?? [])
    .filter((variant) =>
      variant.combination.every((part) =>
        part.attribute_id === attributeId
          ? part.value_key === valueKey
          : !selection[part.attribute_id] || selection[part.attribute_id] === part.value_key,
      ),
    )
    .reduce((sum, variant) => sum + variant.quantity, 0);

/** Selección inicial: el primer valor con stock de cada atributo (color primero). */
export const defaultSelection = (product: IProduct): VariantSelection => {
  const selection: VariantSelection = {};
  for (const attribute of getInventoryAttributes(product)) {
    const values = attribute.value.map(getValueKey);
    const withStock = values.find((key) => availableFor(product, selection, attribute.id, key) > 0);
    selection[attribute.id] = withStock ?? values[0] ?? "";
  }
  return selection;
};

/** Texto legible de la selección: "Rojo · M". */
export const selectionLabel = (product: IProduct, selection: VariantSelection) =>
  getInventoryAttributes(product)
    .map((attribute) => {
      const value = attribute.value.find((v) => getValueKey(v) === selection[attribute.id]);
      return value ? getValueLabel(value) : null;
    })
    .filter(Boolean)
    .join(" · ");

/** Hex del color elegido (para el punto de color del carrito). */
export const selectedColorHex = (product: IProduct, selection: VariantSelection) => {
  const color = getInventoryAttributes(product).find(isColorAttribute);
  return color ? selection[color.id] ?? "" : "";
};

/** El producto se puede vender solo si hay alguna variante con unidades (o no usa variantes). */
export const isProductAvailable = (product: IProduct) =>
  !product.variants?.length || product.variants.some((variant) => variant.quantity > 0);
