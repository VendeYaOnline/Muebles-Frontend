"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQueryCarousels } from "@/api/queries";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";

export default function ProductCarousel() {
  const { data } = useQueryCarousels();

  if (!data?.length) return <div className="my-10" />;

  return (
    <>
      {data.map((carousel) => (
        <section
          key={carousel.id}
          className="py-20 bg-charcoal overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="mb-12 flex flex-col gap-3"
            >
              <div className="gold-line" />
              <p className="text-xs text-gold tracking-[0.2em] uppercase">Ofertas</p>
              <h2
                className="text-3xl text-white"
                style={{ fontFamily: "var(--font-semibold)" }}
              >
                Promociones imperdibles
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Carousel className="w-full" opts={{ slidesToScroll: 1 }}>
                <CarouselContent className="-ml-4">
                  {carousel.products.map((product, index) => (
                    <CarouselItem
                      key={product.id}
                      className="pl-4 md:basis-1/2 lg:basis-1/3"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08, duration: 0.5 }}
                        whileHover={{ y: -4 }}
                        className="group bg-warm-dark border border-white/5 rounded-2xl overflow-hidden hover:border-gold/20 transition-all duration-300"
                      >
                        {/* Image */}
                        <div className="relative aspect-square bg-white/5 overflow-hidden">
                          <motion.div
                            whileHover={{ scale: 1.04 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full"
                          >
                            <Image
                              src={product.image_product || "/placeholder.svg"}
                              alt={product.title}
                              fill
                              className="object-contain p-4"
                            />
                          </motion.div>

                          {/* Discount overlay */}
                          {product.discount_price && (
                            <div className="absolute top-3 left-3 flex items-center gap-1 bg-gold text-white text-[10px] tracking-wide px-2.5 py-1 rounded-full">
                              <Tag className="w-2.5 h-2.5" />
                              Oferta
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="p-5 flex flex-col gap-3">
                          <h3 className="text-white/90 text-sm leading-snug line-clamp-2" style={{ fontFamily: "var(--font-semibold)" }}>
                            {product.title}
                          </h3>

                          <div className="flex items-baseline gap-2">
                            {product.discount_price && (
                              <span className="text-warm-gray text-xs line-through">
                                {product.price}
                              </span>
                            )}
                            <span
                              className="text-gold text-xl"
                              style={{ fontFamily: "var(--font-bold)" }}
                            >
                              {product.discount_price || product.price}
                            </span>
                            {product.discount_price && (
                              <span className="text-white/40 text-xs">Hoy</span>
                            )}
                          </div>

                          <motion.button
                            whileHover={{ backgroundColor: "#c9a86a" }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full bg-gold/90 text-white text-xs tracking-wide py-2.5 rounded-xl transition-colors duration-200 mt-1"
                          >
                            Ver oferta
                          </motion.button>
                        </div>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-5 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-gold/30" />
                <CarouselNext className="hidden md:flex -right-5 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-gold/30" />
              </Carousel>
            </motion.div>
          </div>
        </section>
      ))}
    </>
  );
}
