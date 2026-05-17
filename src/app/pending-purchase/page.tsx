"use client";

import { Clock, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const PendingPurchase = () => {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-lg flex flex-col items-center gap-6">

        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 20 }}
          className="relative"
        >
          <div className="w-24 h-24 rounded-full bg-amber-50 flex items-center justify-center">
            <Clock className="w-12 h-12 text-amber-500" strokeWidth={1.5} />
          </div>
          {/* Rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-300"
          />
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
          className="w-full bg-ivory border border-warm-border rounded-3xl p-8 flex flex-col items-center gap-5 text-center"
        >
          <div>
            <h1 className="text-2xl text-charcoal mb-3" style={{ fontFamily: "var(--font-bold)" }}>
              Pago en proceso
            </h1>
            <p className="text-warm-gray text-sm leading-relaxed max-w-sm">
              Hemos recibido tu solicitud de pago a través de Mercado Pago. Estamos esperando la confirmación de tu entidad financiera.
            </p>
          </div>

          {/* Status steps */}
          <div className="w-full flex flex-col gap-3 my-2">
            {[
              { label: "Pago recibido", done: true },
              { label: "En verificación", active: true },
              { label: "Confirmación final", done: false },
            ].map(({ label, done, active }) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  done ? "bg-gold" : active ? "bg-amber-400" : "bg-warm-border"
                }`}>
                  {done ? (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : active ? (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                      className="w-2 h-2 rounded-full bg-white"
                    />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                  )}
                </div>
                <span className={`text-sm ${done || active ? "text-charcoal" : "text-warm-gray"}`} style={{ fontFamily: done || active ? "var(--font-semibold)" : "var(--font-regular)" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-warm-gray border border-warm-border rounded-xl px-4 py-3 bg-cream w-full text-left">
            <span className="text-gold font-medium">Nota:</span> Recibirás una notificación cuando se confirme tu pago. Este proceso puede tomar algunos minutos.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 w-full"
        >
          <a
            href="https://wa.me/+573204586138?text=Hola,%20tengo%20un%20pago%20pendiente%20y%20quiero%20más%20información."
            target="_blank"
            className="flex-1"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 bg-charcoal text-white py-3 rounded-xl text-sm tracking-wide"
            >
              <MessageCircle className="w-4 h-4" />
              Contactar soporte
            </motion.button>
          </a>
          <Link href="/products" className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 border border-warm-border text-warm-gray hover:text-charcoal hover:border-charcoal/20 py-3 rounded-xl text-sm transition-colors"
            >
              Seguir comprando
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default PendingPurchase;
