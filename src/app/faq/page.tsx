"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { MessageCircle, ShoppingCart, CreditCard, Package, Truck, RefreshCw } from "lucide-react";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const categories = [
  { icon: ShoppingCart, label: "Compras" },
  { icon: CreditCard, label: "Pagos" },
  { icon: Package, label: "Productos" },
  { icon: Truck, label: "Envíos" },
];

const faqs = [
  {
    id: "item-1",
    question: "¿Debo registrarme para poder comprar en MEM?",
    answer:
      "No es necesario. Puedes agregar productos al carrito sin estar registrado. Al momento de completar tu compra deberás ingresar tus datos personales y seleccionar tu método de pago.",
  },
  {
    id: "item-2",
    question: "¿Cuál es el proceso para comprar en MEM?",
    answer: null,
    steps: [
      "Usa el buscador o navega por las categorías para encontrar lo que necesitas.",
      "Agrega el producto al carrito de compras.",
      "Haz clic en 'Ir al carrito y pagar' dentro del carrito.",
      "Ingresa tus datos personales y dirección de envío.",
      "Selecciona tu método de pago y confirma el pedido.",
    ],
  },
  {
    id: "item-3",
    question: "¿Los precios en MEM son los mismos que en tienda física?",
    answer:
      "Sí. Nuestros precios son iguales tanto en tienda física como en nuestra tienda online. Además, los descuentos y promociones aplican en ambos canales.",
  },
  {
    id: "item-4",
    question: "¿Encuentro los mismos productos en tienda física y en MEM?",
    answer:
      "El catálogo es el mismo. Sin embargo, para confirmar disponibilidad específica en tienda puedes comunicarte a nuestra línea de atención: 3204586138.",
  },
  {
    id: "item-5",
    question: "¿Cuáles son los métodos de pago disponibles?",
    answer:
      "Actualmente aceptamos pago por transferencia bancaria a través de Bancolombia y BBVA. Pronto habilitaremos más opciones de pago.",
  },
  {
    id: "item-6",
    question: "¿Cuánto tarda en llegar mi pedido?",
    answer:
      "Los tiempos de entrega varían según tu ubicación. Para consultar el tiempo estimado para tu ciudad, comunícate con nosotros por WhatsApp al 3204586138.",
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-ivory border-b border-warm-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col gap-4"
          >
            <div className="gold-line" />
            <p className="text-xs text-gold tracking-[0.2em] uppercase">Centro de ayuda</p>
            <h1 className="text-4xl lg:text-5xl text-charcoal leading-tight" style={{ fontFamily: "var(--font-bold)" }}>
              Preguntas<br />frecuentes
            </h1>
            <p className="text-warm-gray text-base leading-relaxed max-w-lg">
              Resolvemos tus dudas sobre el proceso de compra, pagos y envíos.
            </p>
          </motion.div>

          {/* Category pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease }}
            className="flex gap-2 flex-wrap mt-8"
          >
            {categories.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white border border-warm-border rounded-full px-4 py-2 text-sm text-warm-gray"
              >
                <Icon className="w-3.5 h-3.5 text-gold" strokeWidth={1.5} />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* FAQ list */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.07, duration: 0.5, ease }}
              >
                <AccordionItem
                  value={faq.id}
                  className="bg-ivory border border-warm-border rounded-2xl px-6 py-1 hover:border-gold/30 transition-colors duration-200 data-[state=open]:border-gold/40 data-[state=open]:shadow-sm data-[state=open]:shadow-gold/5"
                >
                  <AccordionTrigger className="text-sm text-charcoal hover:text-gold hover:no-underline text-left py-5 gap-4 [&[data-state=open]]:text-gold" style={{ fontFamily: "var(--font-semibold)" }}>
                    <span className="flex-1">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-warm-gray text-sm leading-relaxed pb-5">
                    {faq.steps ? (
                      <div className="flex flex-col gap-3">
                        <p>Para encontrar el producto que buscas, sigue estos pasos:</p>
                        <ol className="flex flex-col gap-2">
                          {faq.steps.map((step, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="w-5 h-5 rounded-full bg-gold/10 text-gold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5" style={{ fontFamily: "var(--font-semibold)" }}>
                                {i + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ) : (
                      faq.answer
                    )}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mt-16 bg-charcoal rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="text-white text-xl" style={{ fontFamily: "var(--font-semibold)" }}>
              ¿No encontraste tu respuesta?
            </h3>
            <p className="text-white/50 text-sm">
              Nuestro equipo está listo para ayudarte por WhatsApp.
            </p>
          </div>
          <a
            href="https://wa.me/+573204586138?text=Hola,%20tengo%20una%20pregunta%20sobre%20sus%20productos."
            target="_blank"
          >
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: "#c9a86a" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-gold text-white px-7 py-3 rounded-full text-sm tracking-wide transition-colors duration-200 flex-shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              Contactar por WhatsApp
            </motion.button>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
