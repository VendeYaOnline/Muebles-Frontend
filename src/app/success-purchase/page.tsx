"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, AlertCircle, User, MapPin, Mail, Phone, Hash, ArrowRight, ShoppingBag } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const SuccessPurchaseContent = () => {
  const searchParams = useSearchParams();
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const id = searchParams.get("payment_id");
    if (id) setPaymentId(id);
    else { setError(true); setLoading(false); }
  }, [searchParams]);

  useEffect(() => {
    if (!paymentId) return;
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.mercadopago.com/v1/payments/${paymentId}`,
          { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}` } }
        );
        if (data.metadata) setData(data.metadata);
        else setError(true);
        if (data.order?.id) setOrderId(data.order.id);
      } catch { setError(true); }
      finally { setLoading(false); }
    };
    fetchData();
  }, [paymentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="loader-3" />
          <p className="text-warm-gray text-sm">Verificando tu pago...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease }}
          className="w-full max-w-md bg-ivory border border-warm-border rounded-3xl p-10 text-center flex flex-col items-center gap-5"
        >
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-500" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-xl text-charcoal mb-2" style={{ fontFamily: "var(--font-semibold)" }}>
              No se encontró el pago
            </h2>
            <p className="text-warm-gray text-sm leading-relaxed">
              No pudimos obtener los datos de tu transacción. Por favor contacta a soporte.
            </p>
          </div>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-charcoal text-white px-6 py-3 rounded-full text-sm"
            >
              Ir a contacto
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-16 px-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        {/* Success hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="bg-ivory border border-warm-border rounded-3xl p-10 flex flex-col items-center gap-5 text-center"
        >
          {/* Animated check */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
            className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <CheckCircle className="w-10 h-10 text-green-500" strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-2xl text-charcoal mb-2"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              ¡Compra realizada con éxito!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-warm-gray text-sm"
            >
              Gracias por tu compra. Pronto nos pondremos en contacto contigo.
            </motion.p>
          </div>

          {orderId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-5 py-2"
            >
              <Hash className="w-3.5 h-3.5 text-gold" />
              <span className="text-xs text-gold tracking-wide" style={{ fontFamily: "var(--font-semibold)" }}>
                Orden #{orderId}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Buyer details */}
        {data && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5, ease }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Personal info */}
            <div className="bg-ivory border border-warm-border rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-gold" />
                <p className="text-xs text-gold tracking-[0.12em] uppercase" style={{ fontFamily: "var(--font-semibold)" }}>
                  Datos del comprador
                </p>
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Nombre", value: `${data.first_name} ${data.last_name}` },
                  { label: "Teléfono", value: data.phone },
                  { label: "Correo", value: data.email },
                  { label: "Identificación", value: data.id_number },
                ].map(({ label, value }) => value && (
                  <div key={label}>
                    <p className="text-[10px] text-warm-gray uppercase tracking-wide">{label}</p>
                    <p className="text-sm text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping info */}
            <div className="bg-ivory border border-warm-border rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                <p className="text-xs text-gold tracking-[0.12em] uppercase" style={{ fontFamily: "var(--font-semibold)" }}>
                  Dirección de envío
                </p>
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Departamento", value: data.department },
                  { label: "Ciudad", value: data.city },
                  { label: "Dirección", value: data.address },
                  { label: "Info adicional", value: data.additional_info },
                ].map(({ label, value }) => value && (
                  <div key={label}>
                    <p className="text-[10px] text-warm-gray uppercase tracking-wide">{label}</p>
                    <p className="text-sm text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#c9a86a" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-gold text-white px-8 py-3 rounded-full text-sm tracking-wide transition-colors duration-200"
            >
              <ShoppingBag className="w-4 h-4" />
              Seguir comprando
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

const SuccessPurchase = () => (
  <Suspense fallback={
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="loader-3" />
    </div>
  }>
    <SuccessPurchaseContent />
  </Suspense>
);

export default SuccessPurchase;
