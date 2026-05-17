"use client";

import Image from "next/image";
import Link from "next/link";
import Image1 from "/public/interiores.jpg";
import Image2 from "/public/dormitorios.jpg";
import Image3 from "/public/cocina.png";
import Image4 from "/public/electrodomesticos.jpg";
import { useCategory } from "@/hooks";
import { motion } from "framer-motion";

const gridCategories = [
  {
    image: Image1,
    alt: "Interiores",
    label: "Interiores",
    categories: ["COMEDORES", "JUEGOS DE SALA", "MESA DE CENTRO", "JUEGOS DE COMEDOR", "SOFÁ CAMAS"],
    description: "Salas, comedores y más",
  },
  {
    image: Image3,
    alt: "Cocina",
    label: "Cocina",
    categories: ["ESTUFAS", "LICUADORAS", "VAJILLAS", "JUEGO DE OLLAS", "SARTENES", "CUBIERTOS"],
    description: "Equipamiento completo",
  },
  {
    image: Image2,
    alt: "Dormitorios",
    label: "Dormitorios",
    categories: ["ARMARIOS", "BASE CAMAS", "COLCHONES", "SILLAS DE ESCRITORIO", "CLOSETS", "SOFÁS", "SILLAS", "MESA DE CENTRO"],
    description: "Tu espacio de descanso",
  },
  {
    image: Image4,
    alt: "Electrodomésticos",
    label: "Electrodomésticos",
    categories: ["PORTATILES", "TELEVISORES", "NEVERAS", "LAVADORAS", "EQUIPOS DE SONIDO", "PLANCHAS"],
    description: "Tecnología para tu hogar",
  },
];

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.12, duration: 0.7, ease },
  }),
};

export default function CategoriesGrid() {
  const { setCategories } = useCategory();

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">

        {/* Left: Editorial heading */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="lg:sticky lg:top-28 flex flex-col gap-6"
        >
          <div className="gold-line" />
          <p className="text-xs text-gold tracking-[0.2em] uppercase">Nuestro catálogo</p>

          <h2
            className="text-5xl lg:text-6xl text-charcoal leading-[1.05]"
            style={{ fontFamily: "var(--font-bold)" }}
          >
            Nuestras<br />
            <span className="text-gold">Referencias</span>
          </h2>

          <p className="text-warm-gray text-sm leading-relaxed max-w-xs">
            Encuentra todo lo que necesitas para transformar cada rincón de tu hogar con estilo y calidad.
          </p>

          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: "#1a1714" }}
              whileTap={{ scale: 0.97 }}
              className="w-fit flex items-center gap-2 bg-charcoal text-white px-7 py-3 rounded-full text-sm tracking-wide transition-colors duration-200"
            >
              Ver todo el catálogo
              <span className="text-gold">→</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Right: 2×2 grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {gridCategories.map((cat, index) => (
            <motion.div
              key={cat.label}
              custom={index}
              variants={cardVariants}
            >
              <Link
                href="/products"
                onClick={() => setCategories(cat.categories)}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-charcoal block"
              >
                {/* Image */}
                <motion.div
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    className="object-cover opacity-75 group-hover:opacity-60 transition-opacity duration-500"
                  />
                </motion.div>

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white/50 text-xs tracking-widest uppercase mb-1 group-hover:text-gold/70 transition-colors duration-300">
                    {cat.description}
                  </p>
                  <h2
                    className="text-white text-xl"
                    style={{ fontFamily: "var(--font-semibold)" }}
                  >
                    {cat.label}
                  </h2>

                  {/* Arrow reveal on hover */}
                  <motion.div className="mt-2 overflow-hidden h-5">
                    <motion.span
                      className="block text-gold text-xs tracking-wide translate-y-5 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      Explorar categoría →
                    </motion.span>
                  </motion.div>
                </div>

                {/* Gold left border */}
                <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-gradient-to-b from-gold to-gold-light scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top rounded-full" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
