"use client";

import Image from "next/image";
import ImageBaner from "/public/baner.png";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease },
  }),
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease, delay: 0.2 },
  },
};

const Banner = () => {
  return (
    <section className="relative bg-charcoal min-h-[92vh] flex items-center overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/30" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal/60 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24">
        {/* Left: Text content */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="flex items-center gap-2 w-fit"
          >
            <div className="flex items-center gap-2 border border-gold/40 rounded-full px-4 py-1.5 bg-gold/10 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="text-gold text-xs tracking-[0.15em] uppercase font-medium">
                Colección {new Date().getFullYear()}
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden">
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05]"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Transforma
            </motion.h1>
          </div>
          <div className="overflow-hidden -mt-4">
            <motion.h1
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-3"
              style={{ fontFamily: "var(--font-bold)", color: "#b8975a" }}
            >
              tu hogar.
            </motion.h1>
          </div>

          {/* Divider line */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="gold-line"
          />

          {/* Description */}
          <motion.p
            custom={4}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-white/60 text-base leading-relaxed max-w-md"
          >
            Descubre nuestra colección de muebles y electrodomésticos de alta
            calidad. Diseño, confort y estilo para crear el espacio que siempre
            soñaste.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="flex items-center gap-4 flex-wrap"
          >
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#c9a86a" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 bg-gold text-white px-8 py-3.5 rounded-full text-sm tracking-wide font-medium"
              >
                Ver catálogo
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:border-white/40 px-8 py-3.5 rounded-full text-sm tracking-wide transition-all duration-200"
              >
                Contáctanos
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            custom={6}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="flex items-center gap-8 pt-4"
          >
            {[
              { value: "25+", label: "Años de experiencia" },
              { value: "500+", label: "Productos" },
              { value: "100%", label: "Garantía" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span
                  className="text-2xl text-gold"
                  style={{ fontFamily: "var(--font-bold)" }}
                >
                  {stat.value}
                </span>
                <span className="text-white/40 text-xs tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Image */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="relative flex justify-center items-center"
        >
          {/* Glow behind image */}
          <div className="absolute inset-0 bg-gold/10 rounded-3xl blur-3xl scale-75" />

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative rounded-2xl overflow-hidden"
          >
            <Image
              src={ImageBaner}
              alt="Sala de estar moderna"
              width={600}
              height={600}
              style={{
                height: "auto",
                width: "auto",
                maxHeight: "70vh",
                objectFit: "cover",
              }}
              priority
            />
            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
          </motion.div>

          {/* Floating card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-6 left-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white text-xs font-medium">
                Envío a todo el llano colombiano
              </p>
              <p className="text-white/50 text-xs">Consulta condiciones</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-[0.2em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Banner;
