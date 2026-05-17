"use client";

import { useQueryFeatured } from "@/api/queries";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease },
  }),
};

const FeaturedProducts = () => {
  const { data, isLoading } = useQueryFeatured(1, "");

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-ivory border border-warm-border">
              <div className="skeleton-loader-image-product aspect-square" />
              <div className="p-5 flex flex-col gap-3">
                <div className="skeleton-loader-image-product h-4 rounded w-3/4" />
                <div className="skeleton-loader-image-product h-4 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.grandTotal === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-12 flex flex-col gap-3"
      >
        <div className="gold-line" />
        <p className="text-xs text-gold tracking-[0.2em] uppercase">Destacados</p>
        <h2 className="text-3xl text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>
          Ofertas para tu hogar
        </h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {data.products.map(({ product, id }, index) => (
          <motion.div
            key={id}
            custom={index}
            variants={cardVariants}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="group bg-ivory border border-warm-border rounded-2xl overflow-hidden hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-cream">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full h-full"
              >
                <Image
                  src={product.image_product}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Discount badge */}
              {product.discount > 0 && (
                <div className="absolute top-3 left-3 bg-charcoal text-white text-[10px] tracking-wide px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Tag className="w-2.5 h-2.5" />
                  {product.discount}% OFF
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-5 flex flex-col gap-3">
              <h3 className="text-sm text-charcoal leading-snug" style={{ fontFamily: "var(--font-semibold)" }}>
                {product.title.length > 42 ? product.title.slice(0, 42) + "…" : product.title}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                {product.discount_price ? (
                  <>
                    <span className="text-base text-charcoal" style={{ fontFamily: "var(--font-bold)" }}>
                      {product.discount_price}
                    </span>
                    <span className="text-xs text-warm-gray line-through">{product.price}</span>
                  </>
                ) : (
                  <span className="text-base text-charcoal" style={{ fontFamily: "var(--font-bold)" }}>
                    {product.price}
                  </span>
                )}
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ backgroundColor: "#c9a86a" }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-gold text-white text-xs tracking-wide py-2.5 rounded-xl transition-colors duration-200 mt-1"
              >
                Ver producto
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedProducts;
