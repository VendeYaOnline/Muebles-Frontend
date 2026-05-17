"use client";

import { motion } from "framer-motion";
import {
  CheckCircle, Building2, Hash, User, CreditCard,
  Clock, Download, ShoppingBag, MessageCircle, ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { ProductSale } from "@/app/dashboard/interfaces";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface Props {
  details: {
    total: string;
    numberOrder: string;
    user?: {
      first_name: string; last_name: string; phone: string;
      department: string; city: string; address: string;
      additional_info: string; email: string; id_number: string;
    };
    products: ProductSale[];
    selectedAccount: {
      accountNumber: string; accountType: string;
      bank: string; holderName: string; holderId: string;
    } | null;
  };
}

const TransferDetails = ({ details }: Props) => {
  const [showProducts, setShowProducts] = useState(false);

  const handleDownload = () => {
    const content = `
      <html>
        <head>
          <title>Orden ${details.numberOrder} — MEM</title>
          <style>
            body { font-family: sans-serif; padding: 32px; color: #1a1714; }
            h2 { font-size: 20px; margin-bottom: 8px; }
            p { margin: 6px 0; font-size: 14px; color: #7c6f64; }
            strong { color: #1a1714; }
            hr { border: none; border-top: 1px solid #e8e0d8; margin: 16px 0; }
          </style>
        </head>
        <body>
          <h2>Orden #${details.numberOrder}</h2>
          <hr/>
          <p><strong>Banco:</strong> ${details.selectedAccount?.bank}</p>
          <p><strong>Tipo de cuenta:</strong> ${details.selectedAccount?.accountType}</p>
          <p><strong>Número de cuenta:</strong> ${details.selectedAccount?.accountNumber}</p>
          <p><strong>Titular:</strong> ${details.selectedAccount?.holderName}</p>
          <p><strong>Cédula del titular:</strong> ${details.selectedAccount?.holderId}</p>
          <hr/>
          <p><strong>Total a transferir:</strong> ${details.total}</p>
        </body>
      </html>
    `;
    const printWindow = window.open("", "", "width=600,height=400");
    printWindow?.document.write(content);
    printWindow?.document.close();
    printWindow?.print();
  };

  return (
    <div className="min-h-screen bg-cream py-16 px-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-5">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="bg-ivory border border-warm-border rounded-3xl p-10 flex flex-col items-center gap-5 text-center"
        >
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
              ¡Pedido registrado!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-warm-gray text-sm leading-relaxed max-w-sm"
            >
              Tu pedido ha sido creado. Realiza la transferencia dentro de las próximas 48 horas para completar la compra.
            </motion.p>
          </div>

          {details.numberOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-5 py-2"
            >
              <Hash className="w-3.5 h-3.5 text-gold" />
              <span className="text-xs text-gold tracking-wide" style={{ fontFamily: "var(--font-semibold)" }}>
                Orden #{details.numberOrder}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Transfer instructions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease }}
          className="bg-ivory border border-warm-border rounded-2xl p-6 flex flex-col gap-4"
        >
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-gold" />
            <p className="text-xs text-gold tracking-[0.12em] uppercase" style={{ fontFamily: "var(--font-semibold)" }}>
              Datos para la transferencia
            </p>
          </div>

          <div className="bg-cream border border-warm-border rounded-2xl px-5 py-4 flex flex-col gap-1">
            <p className="text-[10px] text-warm-gray uppercase tracking-[0.12em]" style={{ fontFamily: "var(--font-semibold)" }}>
              Número de cuenta
            </p>
            <p className="text-2xl text-charcoal tracking-widest" style={{ fontFamily: "var(--font-bold)", letterSpacing: "0.08em" }}>
              {details.selectedAccount?.accountNumber}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Building2, label: "Banco", value: details.selectedAccount?.bank },
              { icon: CreditCard, label: "Tipo", value: details.selectedAccount?.accountType },
              { icon: User, label: "Titular", value: details.selectedAccount?.holderName },
              { icon: Hash, label: "Cédula", value: details.selectedAccount?.holderId },
            ].map(({ icon: Icon, label, value }) => value && (
              <div key={label} className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-warm-border/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-3.5 h-3.5 text-warm-gray" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] text-warm-gray uppercase tracking-wide">{label}</p>
                  <p className="text-sm text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex items-center justify-between bg-gold/8 border border-gold/20 rounded-xl px-5 py-3">
            <p className="text-sm text-warm-gray">Total a transferir</p>
            <p className="text-lg text-gold" style={{ fontFamily: "var(--font-bold)" }}>{details.total}</p>
          </div>
        </motion.div>

        {/* 48h warning */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.5, ease }}
          className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-2xl px-5 py-4"
        >
          <Clock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <div className="flex flex-col gap-0.5">
            <p className="text-sm text-amber-800" style={{ fontFamily: "var(--font-semibold)" }}>Recuerda: tienes 48 horas</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              Realiza la transferencia e incluye tu número de orden <strong>#{details.numberOrder}</strong>. Una vez confirmemos el pago, procesaremos tu envío.
            </p>
          </div>
        </motion.div>

        {/* Products accordion */}
        {details.products?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.5, ease }}
            className="bg-ivory border border-warm-border rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setShowProducts((v) => !v)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-cream transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                <span className="text-sm text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>
                  Detalle de la compra ({details.products.length} {details.products.length === 1 ? "producto" : "productos"})
                </span>
              </div>
              <motion.div animate={{ rotate: showProducts ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-4 h-4 text-warm-gray" />
              </motion.div>
            </button>

            {showProducts && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="border-t border-warm-border"
              >
                <div className="flex flex-col divide-y divide-warm-border">
                  {details.products.map((product: any, i: number) => (
                    <div key={i} className="flex items-center gap-4 px-6 py-4">
                      {(product.image_product || product.images?.[0]) && (
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-warm-border flex-shrink-0 bg-cream">
                          <img
                            src={product.image_product || product.images?.[0]}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-charcoal truncate" style={{ fontFamily: "var(--font-semibold)" }}>{product.title}</p>
                        <p className="text-xs text-warm-gray">Cantidad: {product.quantity}</p>
                      </div>
                      <p className="text-sm text-charcoal flex-shrink-0" style={{ fontFamily: "var(--font-semibold)" }}>
                        {product.discount_price || product.price}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between px-6 py-4 bg-cream border-t border-warm-border">
                  <p className="text-sm text-warm-gray">Total</p>
                  <p className="text-base text-charcoal" style={{ fontFamily: "var(--font-bold)" }}>{details.total}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 border border-warm-border text-warm-gray hover:text-charcoal hover:border-charcoal/20 py-3 rounded-xl text-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            Descargar detalles
          </motion.button>
          <a
            href="https://wa.me/+573204586138?text=Hola,%20quiero%20enviar%20el%20comprobante%20de%20mi%20transferencia."
            target="_blank"
            className="flex-1"
          >
            <motion.button
              whileHover={{ scale: 1.015, backgroundColor: "#c9a86a" }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 bg-gold text-white py-3 rounded-xl text-sm tracking-wide transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              Enviar comprobante
            </motion.button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="flex justify-center"
        >
          <Link href="/products">
            <button className="text-xs text-warm-gray hover:text-charcoal transition-colors underline underline-offset-4">
              Seguir comprando
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default TransferDetails;
