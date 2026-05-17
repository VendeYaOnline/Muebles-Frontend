"use client";

import { initMercadoPago } from "@mercadopago/sdk-react";
import Image from "next/image";
import { useProducts, useUser } from "@/hooks";
import { Landmark, Minus, Plus, Trash2, ChevronLeft, ShieldCheck, Truck, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../dashboard/hooks";
import { getDate, totalSum } from "@/utils";
import { createPreference, saveData } from "@/api/request";
import { convertCurrencyToNumber } from "../dashboard/functions";
import Timeline from "@/components/Timeline";
import FormUser from "./components/FormUser";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const Checkout = () => {
  const { products, addProduct, removeProduct, deleteProduct, totalQuantity, totalDiscount } = useProducts();
  const { setActive } = useCart();
  const navigator = useRouter();
  const total = totalSum(products);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useUser();

  useEffect(() => { if (!products.length) navigator.push("/products"); }, [products]);
  useEffect(() => { setActive(false); }, []);
  useEffect(() => { if (user) setCurrentStep(2); }, [user]);

  initMercadoPago(process.env.NEXT_PUBLIC_API_KEY || "", { locale: "es-CO" });

  const handlePayment = async () => {
    setLoading(true);
    try {
      if (user) {
        const { init_point } = await createPreference(products, user);
        const date = getDate();
        await saveData(
          user.email, total, date,
          products.map((item) => ({
            ...item,
            product: {
              image_product: item.product.image_product,
              title: item.product.title,
              price: item.product.price,
              discount_price: item.product.discount_price,
              discount: item.product.discount,
              images: item.product.images,
              quantity: item.quantity,
              purchase_total:
                item.product.discount !== 0
                  ? convertCurrencyToNumber(item.product.discount_price) * Number(item.quantity) + ""
                  : convertCurrencyToNumber(item.product.price) * Number(item.quantity) + "",
            },
          }))
        );
        if (init_point) window.location.href = init_point;
      } else {
        toast.error("Completa todos los campos");
      }
    } catch (error) {
      console.log("Error al procesar el pago", error);
    } finally {
      setLoading(false);
    }
  };

  if (!products.length) return null;

  return (
    <div className="min-h-screen bg-cream">
      {/* Page header */}
      <div className="bg-ivory border-b border-warm-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-2"
          >
            <div className="gold-line" />
            <h1 className="text-2xl text-charcoal" style={{ fontFamily: "var(--font-bold)" }}>
              Checkout
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        {/* Timeline */}
        <Timeline steps={["Datos del comprador", "Resumen y pago"]} currentStep={currentStep} />

        {/* Step content */}
        <AnimatePresence mode="wait">
          {currentStep === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35 }}
            >
              <FormUser setCurrentStep={setCurrentStep} />
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8"
            >
              {/* Product list */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="gold-line" />
                  <h2 className="text-lg text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>
                    Tus productos
                  </h2>
                </div>

                <div className="flex flex-col gap-3 max-h-[520px] overflow-auto pr-1">
                  {products.map(({ product, quantity, variant }, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06 }}
                      className="bg-ivory border border-warm-border rounded-2xl p-4 flex items-center gap-4 hover:border-gold/20 transition-colors"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-xl bg-cream overflow-hidden">
                        <Image
                          src={product.image_product}
                          alt={product.title}
                          fill
                          className="object-contain p-1"
                          sizes="80px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm text-charcoal mb-0.5 line-clamp-1" style={{ fontFamily: "var(--font-semibold)" }}>
                          {product.title}
                        </h3>
                        {product.Categories.length > 0 && (
                          <p className="text-xs text-warm-gray mb-1">{product.Categories[0].name}</p>
                        )}
                        {variant && (
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <div className="w-3 h-3 rounded-full border border-warm-border" style={{ backgroundColor: variant }} />
                            <span className="text-[10px] text-warm-gray">Color</span>
                          </div>
                        )}

                        {/* Qty */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeProduct(product.id, variant)}
                            className="w-6 h-6 rounded-lg bg-cream border border-warm-border flex items-center justify-center hover:border-gold/40 transition-colors"
                          >
                            <Minus size={10} className="text-charcoal" />
                          </button>
                          <span className="w-5 text-center text-xs text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>
                            {quantity}
                          </span>
                          <button
                            onClick={() => addProduct(product, variant)}
                            className="w-6 h-6 rounded-lg bg-cream border border-warm-border flex items-center justify-center hover:border-gold/40 transition-colors"
                          >
                            <Plus size={10} className="text-charcoal" />
                          </button>
                        </div>
                      </div>

                      {/* Price + delete */}
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <button
                          onClick={() => deleteProduct(product.id, variant)}
                          className="p-1.5 rounded-lg text-warm-gray hover:text-charcoal hover:bg-cream transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div className="text-right">
                          {product.discount_price ? (
                            <>
                              <p className="text-xs text-warm-gray line-through">{product.price}</p>
                              <p className="text-sm text-charcoal" style={{ fontFamily: "var(--font-bold)" }}>
                                {product.discount_price}
                              </p>
                            </>
                          ) : (
                            <p className="text-sm text-charcoal" style={{ fontFamily: "var(--font-bold)" }}>
                              {product.price}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Summary & Payment */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="gold-line" />
                  <h2 className="text-lg text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>
                    Resumen
                  </h2>
                </div>

                {/* Summary card */}
                <div className="bg-ivory border border-warm-border rounded-2xl overflow-hidden">
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-warm-gray">Productos</span>
                      <span className="text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>
                        {totalQuantity}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-warm-gray">Envío</span>
                      <span className="text-green-600 text-xs font-medium">Gratis</span>
                    </div>
                    {totalDiscount > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-warm-gray flex items-center gap-1">
                          <Tag className="w-3 h-3" /> Ahorraste
                        </span>
                        <span className="text-gold text-xs" style={{ fontFamily: "var(--font-semibold)" }}>
                          {`$ ${totalDiscount.toLocaleString("es-CO")}`}
                        </span>
                      </div>
                    )}
                    <div className="border-t border-warm-border pt-4 flex justify-between items-center">
                      <span className="text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>Total</span>
                      <span className="text-xl text-charcoal" style={{ fontFamily: "var(--font-bold)" }}>
                        {total}
                      </span>
                    </div>
                  </div>

                  {/* Trust badges */}
                  <div className="px-6 py-4 bg-cream border-t border-warm-border flex flex-col gap-2">
                    {[
                      { icon: ShieldCheck, text: "Compra 100% segura" },
                      { icon: Truck, text: "Envío a toda Colombia" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        <span className="text-xs text-warm-gray">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment button */}
                <Link href="/bank-transfer">
                  <motion.button
                    whileHover={{ scale: 1.01, backgroundColor: "#c9a86a" }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-gold text-white py-3.5 rounded-xl text-sm tracking-wide transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="loader-mini" />
                    ) : (
                      <>
                        <Landmark size={16} />
                        Pagar por transferencia
                      </>
                    )}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start mt-8"
          >
            <motion.button
              onClick={() => setCurrentStep(1)}
              whileHover={{ x: -3 }}
              className="flex items-center gap-2 text-sm text-warm-gray hover:text-charcoal transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Volver a datos
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
