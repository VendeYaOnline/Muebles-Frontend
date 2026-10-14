"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import type { IProduct, ProductAttribute } from "@/interfaces";
import {
  type VariantSelection,
  availableFor,
  getValueKey,
  getValueLabel,
  isColorAttribute,
} from "@/lib/variants";

interface VariantSelectorProps {
  product: IProduct;
  attributes: ProductAttribute[];
  selection: VariantSelection;
  onChange: (attributeId: string, valueKey: string) => void;
  /** Estilo compacto para la página de detalle (sin framer). */
  compact?: boolean;
}

/**
 * Selectores de variante: el color como círculos y el resto (talla, peso...)
 * como píldoras. Los valores sin unidades para la combinación elegida se
 * muestran atenuados y tachados.
 */
const VariantSelector: React.FC<VariantSelectorProps> = ({
  product,
  attributes,
  selection,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-5">
      {attributes.map((attribute) => {
        const isColor = isColorAttribute(attribute);
        const selectedKey = selection[attribute.id];
        const selectedValue = attribute.value.find((v) => getValueKey(v) === selectedKey);

        return (
          <div key={attribute.id} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p
                className="text-xs text-warm-gray uppercase tracking-[0.12em]"
                style={{ fontFamily: "var(--font-semibold)" }}
              >
                {attribute.attribute_name}
              </p>
              {selectedValue && (
                <span
                  className="text-xs text-charcoal capitalize"
                  style={{ fontFamily: "var(--font-semibold)" }}
                >
                  {getValueLabel(selectedValue)}
                </span>
              )}
            </div>

            <div className="flex gap-3 flex-wrap">
              {attribute.value.map((value, index) => {
                const key = getValueKey(value);
                const label = getValueLabel(value);
                const isSelected = selectedKey === key;
                const units = availableFor(product, selection, attribute.id, key);
                const soldOut = units <= 0;

                if (isColor) {
                  return (
                    <motion.button
                      key={`${key}-${index}`}
                      type="button"
                      whileHover={{ scale: soldOut ? 1 : 1.08 }}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => onChange(attribute.id, key)}
                      title={soldOut ? `${label} · agotado` : label}
                      className={`relative flex flex-col items-center gap-1.5 group ${soldOut ? "opacity-45" : ""}`}
                    >
                      <div
                        className={`w-9 h-9 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                          isSelected
                            ? "border-gold ring-2 ring-gold/25 scale-110"
                            : "border-warm-border hover:border-gold/40"
                        }`}
                        style={{ backgroundColor: key || "#e8e0d8" }}
                      >
                        {isSelected && (
                          <Check
                            className="w-3.5 h-3.5 drop-shadow"
                            style={{ color: key && key.toLowerCase() !== "#ffffff" ? "white" : "#1a1714" }}
                            strokeWidth={2.5}
                          />
                        )}
                        {soldOut && (
                          <span className="absolute w-11 h-px bg-charcoal/60 rotate-45" aria-hidden="true" />
                        )}
                      </div>
                      <span
                        className={`text-[9px] uppercase tracking-wide transition-colors ${
                          isSelected ? "text-gold" : "text-warm-gray group-hover:text-charcoal"
                        } ${soldOut ? "line-through" : ""}`}
                        style={{ fontFamily: "var(--font-semibold)" }}
                      >
                        {label}
                      </span>
                    </motion.button>
                  );
                }

                return (
                  <motion.button
                    key={`${key}-${index}`}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onChange(attribute.id, key)}
                    title={soldOut ? `${label} · agotado` : label}
                    className={`min-w-[2.75rem] px-3 py-1.5 rounded-full border text-xs transition-all duration-200 ${
                      isSelected
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-warm-border text-charcoal hover:border-gold/40"
                    } ${soldOut ? "opacity-45 line-through" : ""}`}
                    style={{ fontFamily: "var(--font-semibold)" }}
                  >
                    {label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VariantSelector;
