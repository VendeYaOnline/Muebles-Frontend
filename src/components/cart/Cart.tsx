"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, PackageOpen, Plus, Trash2, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useProducts } from "@/hooks";
import { calculateTotal, totalSum } from "@/utils";
import { useCart } from "@/app/dashboard/hooks";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { products, removeProduct, addProduct, deleteProduct } = useProducts();
  const { active, setActive } = useCart();
  const total = totalSum(products);

  return (
    <AnimatePresence>
      {active && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(false)}
            className="fixed inset-0 bg-charcoal/30 backdrop-blur-sm z-30"
          />

          {/* Cart panel */}
          <motion.section
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="fixed top-0 right-0 w-[400px] max-w-full h-full bg-ivory border-l border-warm-border z-40 flex flex-col shadow-2xl shadow-charcoal/20"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-warm-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-gold" />
                <h1 className="text-sm text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>
                  Tu carrito
                </h1>
                {products.length > 0 && (
                  <span className="bg-gold/10 text-gold text-xs rounded-full px-2 py-0.5">
                    {products.reduce((s, p) => s + p.quantity, 0)} ítems
                  </span>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                transition={{ duration: 0.15 }}
                onClick={() => setActive(false)}
                className="p-1.5 rounded-xl text-warm-gray hover:text-charcoal hover:bg-cream transition-all"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {products.length ? (
              <>
                {/* Item list */}
                <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
                  <AnimatePresence initial={false}>
                    {products.map(({ product, quantity, variant }, index) => (
                      <motion.div
                        key={`${product.id}-${variant}-${index}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.25 }}
                        className="bg-white rounded-2xl border border-warm-border p-4 flex gap-3"
                      >
                        {/* Image */}
                        <Link
                          href={`/products/${product.title.toLowerCase().replace(/ /g, "-")}-${product.id}`}
                          onClick={() => setActive(false)}
                          className="w-20 h-20 rounded-xl bg-cream flex-shrink-0 overflow-hidden block"
                        >
                          <Image
                            alt={product.title}
                            src={product.image_product}
                            width={80}
                            height={80}
                            className="w-full h-full object-contain p-1"
                          />
                        </Link>

                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <h2 className="text-xs text-charcoal leading-snug line-clamp-2" style={{ fontFamily: "var(--font-semibold)" }}>
                              {product.title}
                            </h2>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              onClick={() => deleteProduct(product.id, variant)}
                              className="p-1 rounded-lg text-warm-gray hover:text-charcoal hover:bg-cream transition-all flex-shrink-0"
                            >
                              <Trash2 size={12} />
                            </motion.button>
                          </div>

                          {/* Color variant */}
                          {variant && (
                            <div className="flex items-center gap-1.5">
                              <div
                                className="w-3 h-3 rounded-full border border-warm-border"
                                style={{ backgroundColor: variant }}
                              />
                              <span className="text-[10px] text-warm-gray">Color</span>
                            </div>
                          )}

                          {/* Price row */}
                          <div className="flex items-center justify-between mt-auto">
                            {/* Qty controls */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => removeProduct(product.id, variant)}
                                className="w-6 h-6 rounded-lg bg-cream border border-warm-border flex items-center justify-center hover:border-gold/40 transition-colors"
                              >
                                <Minus size={10} className="text-charcoal" />
                              </button>
                              <span className="w-5 text-center text-xs text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>
                                {quantity}
                              </span>
                              <button
                                onClick={() => addProduct(product, variant)}
                                className="w-6 h-6 rounded-lg bg-cream border border-warm-border flex items-center justify-center hover:border-gold/40 transition-colors"
                              >
                                <Plus size={10} className="text-charcoal" />
                              </button>
                            </div>

                            {/* Subtotal */}
                            <div className="text-right">
                              {product.discount_price && (
                                <p className="text-[10px] text-warm-gray line-through">{product.price}</p>
                              )}
                              <p className="text-xs text-charcoal" style={{ fontFamily: "var(--font-bold)" }}>
                                {calculateTotal(
                                  product.discount_price || product.price,
                                  quantity
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="px-6 py-5 border-t border-warm-border bg-cream">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-warm-gray uppercase tracking-wide">Total del pedido</span>
                    <span className="text-xl text-charcoal" style={{ fontFamily: "var(--font-bold)" }}>
                      {total}
                    </span>
                  </div>
                  <Link href="/checkout" onClick={() => setActive(false)}>
                    <motion.button
                      whileHover={{ backgroundColor: "#c9a86a" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 bg-gold text-white py-3.5 rounded-xl text-sm tracking-wide transition-colors duration-200"
                    >
                      Ir al checkout
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-20 h-20 rounded-3xl bg-cream flex items-center justify-center"
                >
                  <PackageOpen size={36} strokeWidth={1.2} className="text-warm-gray" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <p className="text-base text-charcoal mb-1" style={{ fontFamily: "var(--font-semibold)" }}>
                    Tu carrito está vacío
                  </p>
                  <p className="text-sm text-warm-gray">Explora nuestro catálogo y agrega productos</p>
                </motion.div>
                <Link href="/products" onClick={() => setActive(false)}>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-gold border border-gold/30 rounded-full px-5 py-2.5 hover:bg-gold/5 transition-colors"
                  >
                    Ver productos →
                  </motion.button>
                </Link>
              </div>
            )}
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
