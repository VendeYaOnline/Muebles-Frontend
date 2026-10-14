"use client";

import { Package } from "lucide-react";
import type { IProduct } from "@/interfaces";
import type { useBundleSelection } from "@/hooks/useBundleSelection";
import VariantSelector from "./VariantSelector";

interface BundleSelectorProps {
  product: IProduct;
  bundle: ReturnType<typeof useBundleSelection>;
}

/**
 * Selector de un producto vendido como set: una tarjeta por pieza
 * ("Esqueleto 1", "Esqueleto 2"...), cada una con sus propios color/talla.
 * El stock que ya reservaron las otras piezas se descuenta al calcular la
 * disponibilidad de cada una.
 */
const BundleSelector: React.FC<BundleSelectorProps> = ({ product, bundle }) => {
  if (!bundle.isBundle) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Package className="w-4 h-4 text-gold" strokeWidth={1.5} />
        <p
          className="text-xs text-warm-gray uppercase tracking-[0.12em]"
          style={{ fontFamily: "var(--font-semibold)" }}
        >
          Set x {bundle.size} · elige cada {bundle.label.toLowerCase()}
        </p>
      </div>

      {bundle.pieces.map((piece) => (
        <div
          key={piece.index}
          className={`rounded-2xl border p-4 flex flex-col gap-4 ${
            piece.available > 0 ? "border-warm-border bg-cream/40" : "border-red-300 bg-red-50/40"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-charcoal" style={{ fontFamily: "var(--font-bold)" }}>
              {bundle.label} {piece.index + 1}
            </span>
            <span
              className={`text-[11px] ${piece.available > 0 ? "text-warm-gray" : "text-red-500"}`}
              style={{ fontFamily: "var(--font-semibold)" }}
            >
              {piece.available > 0
                ? `${piece.available} ${piece.available === 1 ? "disponible" : "disponibles"}`
                : "Combinación agotada"}
            </span>
          </div>

          <VariantSelector
            product={piece.productForPiece}
            attributes={bundle.attributes}
            selection={piece.selection}
            onChange={(attributeId, valueKey) => bundle.setValue(piece.index, attributeId, valueKey)}
          />
        </div>
      ))}
    </div>
  );
};

export default BundleSelector;
