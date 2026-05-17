"use client";

import { useCategory } from "@/hooks";
import { featured } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const Category = () => {
  const { setCategories } = useCategory();
  const navigator = useRouter();

  const navigationCategory = (category: string) => {
    setCategories([category]);
    navigator.push("/products");
  };

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
        <p className="text-xs text-gold tracking-[0.2em] uppercase">Explorar</p>
        <h2 className="text-3xl text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>
          Categorías destacadas
        </h2>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {featured.map((category, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            onClick={() => navigationCategory(category.name.toUpperCase())}
            className="group relative cursor-pointer overflow-hidden rounded-2xl aspect-[3/4] bg-charcoal"
          >
            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={category.img}
                alt={category.name}
                fill
                className="object-cover opacity-80 group-hover:opacity-70 transition-opacity duration-500"
              />
            </motion.div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

            {/* Gold hover overlay */}
            <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500" />

            {/* Number */}
            <motion.span
              className="absolute top-4 left-4 text-xs tracking-[0.2em] text-white/40 group-hover:text-gold/60 transition-colors duration-300"
              style={{ fontFamily: "var(--font-semibold)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>

            {/* Category name */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <motion.h3
                className="text-white text-lg leading-tight"
                style={{ fontFamily: "var(--font-semibold)" }}
              >
                {category.name}
              </motion.h3>
              <motion.div
                className="flex items-center gap-1 mt-2 overflow-hidden"
                initial={{ opacity: 0, x: -10 }}
              >
                <motion.span
                  className="text-gold text-xs tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                >
                  Ver productos →
                </motion.span>
              </motion.div>
            </div>

            {/* Gold bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Category;
