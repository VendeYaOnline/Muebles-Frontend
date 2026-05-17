"use client";

import { XCircle, RefreshCw, MessageCircle, CreditCard, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const reasons = [
  { icon: CreditCard, text: "Verifica que los datos de tu tarjeta sean correctos" },
  { icon: ShieldAlert, text: "Asegúrate de tener fondos suficientes" },
  { icon: RefreshCw, text: "Intenta con otro método de pago" },
];

const FailurePurchase = () => {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-lg flex flex-col items-center gap-6">

        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center"
        >
          <XCircle className="w-12 h-12 text-red-500" strokeWidth={1.5} />
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
          className="w-full bg-ivory border border-warm-border rounded-3xl p-8 flex flex-col gap-6"
        >
          <div className="text-center">
            <h1 className="text-2xl text-charcoal mb-3" style={{ fontFamily: "var(--font-bold)" }}>
              Error en el pago
            </h1>
            <p className="text-warm-gray text-sm leading-relaxed">
              No pudimos procesar tu pago. Esto puede ocurrir por distintas razones. A continuación te dejamos algunos pasos para resolverlo.
            </p>
          </div>

          {/* Reasons */}
          <div className="flex flex-col gap-3">
            <p className="text-xs text-warm-gray uppercase tracking-[0.12em]" style={{ fontFamily: "var(--font-semibold)" }}>
              Qué puedes hacer
            </p>
            {reasons.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                className="flex items-center gap-3 p-4 bg-cream rounded-xl border border-warm-border"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-warm-border flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-gold" strokeWidth={1.5} />
                </div>
                <p className="text-sm text-warm-gray">{text}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-xs text-warm-gray bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-center">
            Si el problema persiste después de varios intentos, contacta directamente a tu banco.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 w-full"
        >
          <Link href="/checkout" className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#c9a86a" }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 bg-gold text-white py-3 rounded-xl text-sm tracking-wide transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              Intentar de nuevo
            </motion.button>
          </Link>
          <a
            href="https://wa.me/+573204586138?text=Hola,%20tuve%20un%20problema%20con%20mi%20pago%20y%20necesito%20ayuda."
            target="_blank"
            className="flex-1"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 border border-warm-border text-warm-gray hover:text-charcoal hover:border-charcoal/20 py-3 rounded-xl text-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Contactar soporte
            </motion.button>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default FailurePurchase;
