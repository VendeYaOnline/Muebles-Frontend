"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ChevronLeft, ChevronRight, Shield, Truck, Star,
  ShoppingBag, Check, Tag,
} from "lucide-react";
import Modal from "./Modal";
import Image from "next/image";
import { IProduct } from "@/interfaces";
import { useProducts } from "@/hooks";
import { ProductWithQuantity } from "@/hooks/useProducts";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: IProduct;
  products: ProductWithQuantity[];
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product, products }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [variant, setVariant] = useState("");
  const allImages = [product.image_product, ...product.images];
  const { addProduct } = useProducts();

  const isAdded = products.find((a) => a.product.id === product.id && a.variant === variant);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  const handleClose = useCallback(() => {
    onClose();
    setVariant("");
    setCurrentImageIndex(0);
  }, [onClose]);

  useEffect(() => {
    const firstColor = product.attributes.Color[0]?.color;
    setVariant(firstColor ?? "");
  }, [isOpen, product]);

  const hasDiscount = product.discount > 0 && product.discount_price;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl">
      <div className="flex flex-col lg:grid lg:grid-cols-[5fr_6fr] h-full max-h-[92vh]">

        {/* ── Left: Image gallery ─────────────────────────────────── */}
        <div className="bg-cream flex flex-col gap-3 p-5 lg:p-6 lg:rounded-l-3xl">
          {/* Main image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-warm-border flex-shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22 }}
                className="w-full h-full"
              >
                {allImages[currentImageIndex] ? (
                  <Image
                    src={allImages[currentImageIndex]}
                    alt={product.title}
                    width={600}
                    height={600}
                    className="w-full h-full object-contain p-5"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-warm-border border-t-gold animate-spin" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Discount badge */}
            {hasDiscount && (
              <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] rounded-full px-2.5 py-1 font-semibold">
                -{product.discount}%
              </div>
            )}

            {/* Prev / Next arrows */}
            {allImages.length > 1 && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-warm-border rounded-full shadow-sm flex items-center justify-center"
                >
                  <ChevronLeft size={15} className="text-charcoal" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-warm-border rounded-full shadow-sm flex items-center justify-center"
                >
                  <ChevronRight size={15} className="text-charcoal" />
                </motion.button>
              </>
            )}

            {/* Dot indicators */}
            {allImages.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`rounded-full transition-all duration-200 ${
                      i === currentImageIndex ? "w-4 h-1.5 bg-gold" : "w-1.5 h-1.5 bg-warm-border hover:bg-gold/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
              {allImages.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 bg-white transition-all duration-200 ${
                    index === currentImageIndex
                      ? "border-gold shadow-sm shadow-gold/20"
                      : "border-warm-border hover:border-gold/30"
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-contain p-1" />
                </motion.button>
              ))}
            </div>
          )}

          {/* Trust badges — shown on desktop inside left panel */}
          <div className="hidden lg:flex flex-col gap-2 mt-auto pt-2">
            {[
              { icon: Star, text: "Con garantía incluida" },
              { icon: Shield, text: "Calidad certificada" },
              { icon: Truck, text: "Envío a todo el país" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3 h-3 text-gold" strokeWidth={1.5} />
                </div>
                <span className="text-xs text-warm-gray">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Info panel ───────────────────────────────────── */}
        <div className="flex flex-col min-h-0 lg:rounded-r-3xl">

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-5 lg:p-7 flex flex-col gap-5 pb-0">

            {/* Categories */}
            {product.Categories.length > 0 && (
              <div className="flex flex-wrap gap-2 pr-8">
                {product.Categories.map((category) => (
                  <span
                    key={category.id}
                    className="flex items-center gap-1.5 text-[10px] tracking-[0.1em] uppercase text-gold border border-gold/25 rounded-full px-3 py-1 bg-gold/5"
                    style={{ fontFamily: "var(--font-semibold)" }}
                  >
                    <Tag className="w-2.5 h-2.5" strokeWidth={2} />
                    {category.name}
                  </span>
                ))}
              </div>
            )}

            {/* Title + ref */}
            <div className="flex flex-col gap-1">
              <h1
                className="text-xl lg:text-2xl text-charcoal leading-snug"
                style={{ fontFamily: "var(--font-bold)" }}
              >
                {product.title}
              </h1>
              <p className="text-xs text-warm-gray">Ref: {product.reference}</p>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span
                  className="text-3xl text-charcoal"
                  style={{ fontFamily: "var(--font-bold)" }}
                >
                  {product.price}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-warm-gray line-through">{product.discount_price}</span>
                )}
              </div>
              {hasDiscount && (
                <p className="text-xs text-red-500" style={{ fontFamily: "var(--font-semibold)" }}>
                  Ahorras {product.discount}% con esta oferta
                </p>
              )}
            </div>

            <div className="h-px bg-warm-border" />

            {/* Color selector */}
            {product.attributes.Color.length > 0 && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p
                    className="text-xs text-warm-gray uppercase tracking-[0.12em]"
                    style={{ fontFamily: "var(--font-semibold)" }}
                  >
                    Color
                  </p>
                  {variant && (
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={variant}
                        initial={{ opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        transition={{ duration: 0.15 }}
                        className="text-xs text-charcoal capitalize"
                        style={{ fontFamily: "var(--font-semibold)" }}
                      >
                        {product.attributes.Color.find((c) => c.color === variant)?.name ?? variant}
                      </motion.span>
                    </AnimatePresence>
                  )}
                </div>

                <div className="flex gap-3 flex-wrap">
                  {product.attributes.Color.map((item, index) => {
                    const isSelected = variant === item.color;
                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.93 }}
                        onClick={() => setVariant(item.color)}
                        title={item.name}
                        className="relative flex flex-col items-center gap-1.5 group"
                      >
                        <div
                          className={`w-9 h-9 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                            isSelected
                              ? "border-gold ring-2 ring-gold/25 scale-110"
                              : "border-warm-border hover:border-gold/40"
                          }`}
                          style={{ backgroundColor: item.color || "#e8e0d8" }}
                        >
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                              <Check
                                className="w-3.5 h-3.5 drop-shadow"
                                style={{ color: item.color && item.color.toLowerCase() !== "#ffffff" ? "white" : "#1a1714" }}
                                strokeWidth={2.5}
                              />
                            </motion.div>
                          )}
                        </div>
                        <span
                          className={`text-[9px] uppercase tracking-wide transition-colors ${
                            isSelected ? "text-gold" : "text-warm-gray group-hover:text-charcoal"
                          }`}
                          style={{ fontFamily: "var(--font-semibold)" }}
                        >
                          {item.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className="flex flex-col gap-2">
                <p
                  className="text-xs text-warm-gray uppercase tracking-[0.12em]"
                  style={{ fontFamily: "var(--font-semibold)" }}
                >
                  Descripción
                </p>
                <div className="text-sm text-warm-gray leading-relaxed space-y-1.5 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
                  {product.description.split("\r\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile trust badges */}
            <div className="flex lg:hidden items-center justify-between py-2 border-y border-warm-border">
              {[
                { icon: Star, text: "Garantía" },
                { icon: Shield, text: "Premium" },
                { icon: Truck, text: "Envío rápido" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-gold" strokeWidth={1.5} />
                  <span className="text-[11px] text-warm-gray">{text}</span>
                </div>
              ))}
            </div>

            {/* Spacer so last item isn't hidden behind sticky CTA */}
            <div className="h-2" />
          </div>

          {/* Sticky CTA */}
          <div className="p-5 lg:p-7 pt-4 border-t border-warm-border bg-ivory lg:rounded-br-3xl">
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.div
                  key="added"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-full flex items-center justify-center gap-2.5 bg-gold/10 text-gold border border-gold/30 py-3.5 rounded-2xl text-sm"
                  style={{ fontFamily: "var(--font-semibold)" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.05, type: "spring", stiffness: 400, damping: 20 }}
                    className="w-5 h-5 rounded-full bg-gold flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                  </motion.div>
                  En tu carrito
                </motion.div>
              ) : (
                <motion.button
                  key="add"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.01, backgroundColor: "#c9a86a" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => addProduct(product, variant)}
                  className="w-full flex items-center justify-center gap-2.5 bg-gold text-white py-3.5 rounded-2xl text-sm tracking-wide transition-colors duration-200"
                  style={{ fontFamily: "var(--font-semibold)" }}
                >
                  <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                  Agregar al carrito
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
