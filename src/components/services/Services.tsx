"use client";

import { CreditCard, Headphones, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    number: "01",
    icon: ShieldCheck,
    title: "Garantía",
    description: "Todos nuestros productos cuentan con garantía. Tu satisfacción es nuestra prioridad.",
    link: "/terms-conditions",
  },
  {
    number: "02",
    icon: CreditCard,
    title: "Pago Seguro",
    description: "Transferencia bancaria 100% segura. Múltiples métodos de pago disponibles para ti.",
    link: "/checkout",
  },
  {
    number: "03",
    icon: Headphones,
    title: "Soporte",
    description: "Atención personalizada por WhatsApp. Estamos listos para ayudarte en todo momento.",
    link: "/contact",
  },
];

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease },
  }),
};

export default function Services() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 flex flex-col gap-3"
      >
        <div className="gold-line" />
        <p className="text-xs text-gold tracking-[0.2em] uppercase">Por qué elegirnos</p>
        <h2 className="text-3xl text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>
          Comprometidos con tu hogar
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-warm-border rounded-2xl overflow-hidden">
        {services.map((service, index) => (
          <motion.div
            key={service.number}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={cardVariants}
            className="group bg-ivory p-10 flex flex-col gap-6 hover:bg-cream transition-colors duration-300 cursor-pointer relative overflow-hidden"
          >
            {/* Background number */}
            <span
              className="absolute top-4 right-6 text-7xl font-bold text-warm-border/60 select-none leading-none group-hover:text-gold/10 transition-colors duration-500"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              {service.number}
            </span>

            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0"
            >
              <service.icon size={22} className="text-gold" strokeWidth={1.5} />
            </motion.div>

            {/* Content */}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>
                {service.title}
              </h3>
              <p className="text-sm text-warm-gray leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Link */}
            <Link
              href={service.link}
              className="text-xs text-gold tracking-wide hover:text-charcoal transition-colors duration-200 mt-auto"
            >
              Saber más →
            </Link>

            {/* Bottom gold line that animates on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
