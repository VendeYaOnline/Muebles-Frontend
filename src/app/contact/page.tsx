"use client";

import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const contactItems = [
  {
    icon: MapPin,
    label: "Dirección",
    lines: ["Calle 9 # 11-39, Barrio Los Fundadores", "Villanueva · Casanare, Colombia"],
  },
  {
    icon: Phone,
    label: "Teléfonos",
    lines: ["3204586138", "3103435659"],
  },
  {
    icon: Mail,
    label: "Correo electrónico",
    lines: ["muebleselectrodomesticos27@gmail.com"],
  },
  {
    icon: Clock,
    label: "Horario de atención",
    lines: ["Lun – Sáb: 8:00 AM – 8:00 PM", "Domingo: 8:00 AM – 12:00 PM"],
  },
];

export default function Contacto() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero header */}
      <div className="bg-ivory border-b border-warm-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col gap-4 max-w-xl"
          >
            <div className="gold-line" />
            <p className="text-xs text-gold tracking-[0.2em] uppercase">Estamos aquí</p>
            <h1 className="text-4xl lg:text-5xl text-charcoal leading-tight" style={{ fontFamily: "var(--font-bold)" }}>
              Contáctanos
            </h1>
            <p className="text-warm-gray text-base leading-relaxed">
              Estamos listos para ayudarte con cualquier consulta sobre nuestros productos y servicios.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10">

          {/* Left: contact info */}
          <div className="flex flex-col gap-6">
            {/* Info cards */}
            <div className="flex flex-col gap-3">
              {contactItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease }}
                  className="group bg-ivory border border-warm-border rounded-2xl p-5 flex gap-4 items-start hover:border-gold/30 hover:shadow-md hover:shadow-gold/5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-200">
                    <item.icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs text-gold tracking-wide uppercase mb-1" style={{ fontFamily: "var(--font-semibold)" }}>
                      {item.label}
                    </p>
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-sm text-charcoal leading-relaxed break-all">
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/+573204586138?text=Hola,%20me%20gustaría%20recibir%20información%20sobre%20sus%20productos."
              target="_blank"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.5, ease }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between bg-[#25D366] text-white rounded-2xl px-6 py-4 group"
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">Escríbenos por WhatsApp</p>
                  <p className="text-white/70 text-xs">Respuesta rápida garantizada</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.a>
          </div>

          {/* Right: Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <p className="text-xs text-gold tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-semibold)" }}>
                Ubicación
              </p>
              <h2 className="text-2xl text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>
                Encuéntranos aquí
              </h2>
            </div>

            <div className="rounded-2xl overflow-hidden border border-warm-border shadow-sm" style={{ height: 460 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497.1135461495629!2d-72.93007751505677!3d4.610420565907881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e153b1f1f339ced%3A0xaa7c6935b0fd6da7!2sMUEBLES%20Y%20ELECTRODOM%C3%89STICOS%20DEL%20META!5e0!3m2!1ses!2sco!4v1740682927325!5m2!1ses!2sco"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </div>

            <p className="text-xs text-warm-gray">
              Calle 9 # 11-39, Barrio Los Fundadores · Villanueva, Casanare
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
