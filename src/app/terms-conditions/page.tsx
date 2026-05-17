"use client";

import { motion } from "framer-motion";
import { Mail, FileText, ShieldCheck, Package, CreditCard, Truck, RefreshCw, AlertTriangle, Settings, Scale } from "lucide-react";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const STORE_NAME = "Muebles y Electrodomésticos del Meta";
const SUPPORT_EMAIL = "muebleselectrodomesticos27@gmail.com";

const sections = [
  {
    id: "introduccion",
    number: "01",
    icon: FileText,
    title: "Introducción",
    content: `Bienvenido a ${STORE_NAME}, una tienda en línea especializada en la venta de muebles y electrodomésticos. Al acceder y utilizar nuestro sitio web, usted acepta los siguientes Términos y Condiciones. Si no está de acuerdo con ellos, le pedimos que no utilice nuestro servicio.`,
  },
  {
    id: "uso-del-sitio",
    number: "02",
    icon: ShieldCheck,
    title: "Uso del sitio web",
    content:
      "Nuestro sitio web permite a los usuarios comprar muebles y electrodomésticos sin necesidad de registrarse. Sin embargo, para procesar los envíos, es necesario que el cliente proporcione datos de contacto y dirección de entrega.",
  },
  {
    id: "privacidad",
    number: "03",
    icon: ShieldCheck,
    title: "Privacidad y protección de datos",
    content:
      "Nos comprometemos a proteger la información personal de nuestros clientes. Los datos proporcionados solo se utilizarán para gestionar la compra y el envío del producto. Bajo ninguna circunstancia compartiremos esta información con terceros, salvo que sea requerido por ley.",
  },
  {
    id: "productos",
    number: "04",
    icon: Package,
    title: "Productos y disponibilidad",
    content:
      "Los productos ofrecidos en nuestra tienda están sujetos a disponibilidad. Nos reservamos el derecho de modificar, actualizar o descontinuar productos sin previo aviso. En caso de que un producto adquirido no esté disponible, se le informará al cliente y se le ofrecerá un reemplazo o reembolso.",
  },
  {
    id: "precios",
    number: "05",
    icon: CreditCard,
    title: "Precios y pagos",
    content:
      "Los precios de los productos están indicados en COP e incluyen los impuestos aplicables. Nos reservamos el derecho de modificar los precios en cualquier momento. Los pagos se realizan a través de los métodos de pago habilitados en nuestro sitio web.",
  },
  {
    id: "envios",
    number: "06",
    icon: Truck,
    title: "Envíos y entregas",
    content:
      "Los envíos se realizan a la dirección proporcionada por el cliente en el momento de la compra. El tiempo de entrega puede variar según la ubicación y disponibilidad del producto. No nos hacemos responsables de retrasos ocasionados por terceros o causas de fuerza mayor.",
  },
  {
    id: "devoluciones",
    number: "07",
    icon: RefreshCw,
    title: "Devoluciones y reembolsos",
    content:
      "Si el cliente recibe un producto dañado o defectuoso, debe notificarlo dentro de los 10 días siguientes a la entrega para gestionar un reemplazo o reembolso. Los productos deben devolverse en su empaque original y sin uso.",
  },
  {
    id: "responsabilidad",
    number: "08",
    icon: AlertTriangle,
    title: "Limitación de responsabilidad",
    content:
      "No nos hacemos responsables por daños indirectos, incidentales o consecuentes derivados del uso de nuestros productos o servicios.",
  },
  {
    id: "modificaciones",
    number: "09",
    icon: Settings,
    title: "Modificaciones a los términos",
    content:
      "Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Se recomienda revisar esta sección periódicamente para estar al tanto de cualquier cambio.",
  },
  {
    id: "legislacion",
    number: "10",
    icon: Scale,
    title: "Legislación aplicable",
    content:
      "Estos términos se rigen por las leyes de Colombia y cualquier disputa será resuelta ante los tribunales competentes de dicha jurisdicción.",
  },
];

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-cream">

      {/* Header */}
      <div className="bg-ivory border-b border-warm-border">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col gap-4 max-w-2xl"
          >
            <div className="gold-line" />
            <p className="text-xs text-gold tracking-[0.2em] uppercase">Aviso legal</p>
            <h1 className="text-4xl lg:text-5xl text-charcoal leading-tight" style={{ fontFamily: "var(--font-bold)" }}>
              Términos y<br />condiciones
            </h1>
            <p className="text-warm-gray text-sm leading-relaxed">
              Al usar nuestra plataforma, aceptas los siguientes términos. Última actualización: <span className="text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>27 de febrero de 2025</span>.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16">
        <div className="flex gap-12 lg:gap-16 items-start">

          {/* Sticky TOC sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease }}
            className="hidden lg:flex flex-col gap-1 w-56 xl:w-64 flex-shrink-0 sticky top-24"
          >
            <p className="text-[10px] text-warm-gray uppercase tracking-[0.15em] mb-3 px-3" style={{ fontFamily: "var(--font-semibold)" }}>
              Contenido
            </p>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-warm-gray hover:text-charcoal hover:bg-ivory transition-colors duration-150 group"
              >
                <span className="text-[10px] text-gold tabular-nums" style={{ fontFamily: "var(--font-semibold)" }}>{s.number}</span>
                <span className="group-hover:text-charcoal transition-colors">{s.title}</span>
              </a>
            ))}

            <div className="mt-6 p-4 bg-ivory border border-warm-border rounded-2xl flex flex-col gap-3">
              <p className="text-xs text-warm-gray leading-relaxed">¿Tienes dudas sobre los términos?</p>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="flex items-center gap-2 text-xs text-gold hover:text-charcoal transition-colors"
                style={{ fontFamily: "var(--font-semibold)" }}
              >
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                Escríbenos
              </a>
            </div>
          </motion.aside>

          {/* Sections */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Intro note */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease }}
              className="bg-ivory border border-warm-border rounded-2xl px-6 py-5"
            >
              <p className="text-sm text-warm-gray leading-relaxed">
                Bienvenido a <span className="text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>{STORE_NAME}</span>. Al acceder y utilizar nuestro sitio web, usted acepta los siguientes Términos y Condiciones. Si no está de acuerdo con ellos, le pedimos que no utilice nuestro servicio.
              </p>
            </motion.div>

            {sections.map((s, index) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.id}
                  id={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.04, duration: 0.5, ease }}
                  className="bg-ivory border border-warm-border rounded-2xl p-6 flex flex-col gap-4 hover:border-gold/30 transition-colors duration-200"
                >
                  <div className="flex items-start gap-4">
                    {/* Number + icon */}
                    <div className="flex flex-col items-center gap-1.5 flex-shrink-0 pt-0.5">
                      <span className="text-[11px] text-gold tabular-nums" style={{ fontFamily: "var(--font-semibold)" }}>
                        {s.number}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-gold/8 border border-gold/15 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-gold" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-2 flex-1">
                      <h2 className="text-base text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>
                        {s.title}
                      </h2>
                      <p className="text-sm text-warm-gray leading-relaxed">
                        {s.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="mt-4 bg-charcoal rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex flex-col gap-2 text-center md:text-left">
                <h3 className="text-white text-lg" style={{ fontFamily: "var(--font-semibold)" }}>
                  ¿Tienes preguntas sobre estos términos?
                </h3>
                <p className="text-white/50 text-sm">
                  Escríbenos y te responderemos a la brevedad.
                </p>
              </div>
              <a href={`mailto:${SUPPORT_EMAIL}`}>
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: "#c9a86a" }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 bg-gold text-white px-7 py-3 rounded-full text-sm tracking-wide transition-colors duration-200 flex-shrink-0"
                >
                  <Mail className="w-4 h-4" />
                  {SUPPORT_EMAIL}
                </motion.button>
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
