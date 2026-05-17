"use client";

import { useState, useRef, useEffect } from "react";
import { ShoppingBag, Plus, Minus, X, ArrowRight, PackageOpen } from "lucide-react";
import { ProductWithQuantity } from "@/hooks/useProducts";
import { IProduct } from "@/interfaces";
import { calculateTotal } from "@/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ShoppingCartProps {
  items: ProductWithQuantity[];
  addQuantity: (product: IProduct, variant: string) => void;
  removeQuantity: (id: number, variant: string) => void;
  onRemoveItem: (productId: number, variant: string) => void;
  total: string;
}

const ShoppingCartComponent = ({
  items,
  addQuantity,
  removeQuantity,
  onRemoveItem,
  total,
}: ShoppingCartProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={cartRef}>
      {/* Trigger button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative p-2 rounded-xl text-charcoal hover:text-gold hover:bg-cream transition-all duration-200"
      >
        <ShoppingBag className="w-5 h-5" />
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute -top-0.5 -right-0.5 bg-gold text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center leading-none"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              {totalItems > 9 ? "9+" : totalItems}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="absolute right-0 top-full mt-3 w-96 bg-ivory border border-warm-border rounded-2xl shadow-2xl shadow-charcoal/10 z-50 overflow-hidden origin-top-right"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-warm-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-gold" />
                <h3 className="text-sm text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>
                  Carrito
                </h3>
                {totalItems > 0 && (
                  <span className="bg-gold/10 text-gold text-xs rounded-full px-2 py-0.5">
                    {totalItems} {totalItems === 1 ? "ítem" : "ítems"}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-warm-gray hover:text-charcoal hover:bg-cream transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-12 px-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center">
                  <PackageOpen className="w-7 h-7 text-warm-gray" strokeWidth={1.5} />
                </div>
                <p className="text-sm text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>
                  Tu carrito está vacío
                </p>
                <p className="text-xs text-warm-gray">Agrega productos para comenzar</p>
                <Link href="/products" onClick={() => setIsOpen(false)}>
                  <button className="text-xs text-gold border border-gold/30 rounded-full px-4 py-2 hover:bg-gold/5 transition-colors mt-1">
                    Ver productos →
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <div className="max-h-80 overflow-y-auto">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={`${item.product.id}-${item.variant}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-3 px-5 py-3.5 border-b border-warm-border/60 last:border-b-0 hover:bg-cream/50 transition-colors"
                      >
                        {/* Image */}
                        <div className="w-14 h-14 rounded-xl bg-cream border border-warm-border flex-shrink-0 overflow-hidden">
                          <img
                            src={item.product.image_product}
                            alt={item.product.title}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-charcoal truncate leading-snug mb-1" style={{ fontFamily: "var(--font-semibold)" }}>
                            {item.product.title}
                          </p>

                          {item.variant && (
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <div
                                className="w-3 h-3 rounded-full border border-warm-border flex-shrink-0"
                                style={{ backgroundColor: item.variant }}
                              />
                              <span className="text-[10px] text-warm-gray">
                                {calculateTotal(
                                  item.product.discount_price || item.product.price,
                                  item.quantity
                                )}
                              </span>
                            </div>
                          )}

                          {/* Qty controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => removeQuantity(item.product.id, item.variant)}
                              className="w-6 h-6 rounded-lg bg-cream border border-warm-border flex items-center justify-center hover:border-gold/40 transition-colors"
                            >
                              <Minus className="w-2.5 h-2.5 text-charcoal" />
                            </button>
                            <span className="w-5 text-center text-xs text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addQuantity(item.product, item.variant)}
                              className="w-6 h-6 rounded-lg bg-cream border border-warm-border flex items-center justify-center hover:border-gold/40 transition-colors"
                            >
                              <Plus className="w-2.5 h-2.5 text-charcoal" />
                            </button>
                          </div>
                        </div>

                        {/* Price + remove */}
                        <div className="flex flex-col items-end justify-between flex-shrink-0">
                          <button
                            onClick={() => onRemoveItem(item.product.id, item.variant)}
                            className="p-1 text-warm-gray hover:text-charcoal transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs text-charcoal" style={{ fontFamily: "var(--font-bold)" }}>
                            {item.product.discount_price || item.product.price}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="px-5 py-4 bg-cream border-t border-warm-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-warm-gray uppercase tracking-wide">Total</span>
                    <span className="text-lg text-charcoal" style={{ fontFamily: "var(--font-bold)" }}>
                      {total}
                    </span>
                  </div>
                  <Link href="/checkout" onClick={() => setIsOpen(false)}>
                    <motion.button
                      whileHover={{ scale: 1.01, backgroundColor: "#c9a86a" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 bg-gold text-white py-3 rounded-xl text-sm tracking-wide transition-colors duration-200"
                    >
                      Proceder al pago
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShoppingCartComponent;
