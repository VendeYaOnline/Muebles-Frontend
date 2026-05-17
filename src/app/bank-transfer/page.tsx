"use client";

import { useEffect, useMemo, useState } from "react";
import { createSale, createTransfer } from "@/api/request";
import { useProducts, useUser } from "@/hooks";
import toast from "react-hot-toast";
import { convertCurrencyToNumber } from "../dashboard/functions";
import TransferDetails from "@/components/transfer-details/TransferDetails";
import { getDate, totalSum } from "@/utils";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Building2, Hash, User, CreditCard,
  AlertTriangle, CheckCircle2, X, Loader2,
} from "lucide-react";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

type BankAccount = {
  accountNumber: string;
  accountType: string;
  bank: string;
  holderName: string;
  holderId: string;
};

const bankAccounts: BankAccount[] = [
  {
    accountNumber: "30535297441",
    accountType: "Cuenta de Ahorros",
    bank: "Bancolombia",
    holderName: "Joshua Esteban Parrado Lozada",
    holderId: "17312678",
  },
  {
    accountNumber: "950016691",
    accountType: "Cuenta Corriente",
    bank: "BBVA",
    holderName: "Joshua Esteban Parrado Lozada",
    holderId: "17312678",
  },
];

const BANK_META: Record<string, { accent: string; bg: string; badge: string }> = {
  Bancolombia: {
    accent: "text-gold",
    bg: "bg-gold/8 border-gold/20",
    badge: "bg-gold/10 text-gold border-gold/20",
  },
  BBVA: {
    accent: "text-blue-600",
    bg: "bg-blue-50/60 border-blue-100",
    badge: "bg-blue-50 text-blue-600 border-blue-100",
  },
};

const BankTransfer = () => {
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user, setUser } = useUser();
  const { products, clearProducts } = useProducts();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<{
    total: string;
    numberOrder: string;
    user?: {
      first_name: string; last_name: string; phone: string;
      department: string; city: string; address: string;
      additional_info: string; email: string; id_number: string;
    };
    products: any[];
    selectedAccount: BankAccount | null;
  }>({ total: "", numberOrder: "", products: [], selectedAccount: null, user: user });
  const [successfulPurchase, setSuccessfulPurchase] = useState(false);
  const navigation = useRouter();

  const handleConfirmClick = (account: BankAccount) => {
    setSelectedAccount(account);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedAccount(null);
  };

  useEffect(() => {
    if (!products.length && !successfulPurchase) navigation.push("/checkout");
  }, [products, successfulPurchase]);

  useEffect(() => {
    const localProducts = localStorage.getItem("shopping-products");
    const localBank = localStorage.getItem("selectedAccount");
    const localNumber = localStorage.getItem("numberOrder");
    const localUser = localStorage.getItem("shopping-user");
    if (localProducts && localUser && localNumber && localBank) {
      setDetails({
        user: JSON.parse(localUser),
        numberOrder: localNumber,
        products: JSON.parse(localProducts),
        selectedAccount: JSON.parse(localBank),
        total: totalSum(JSON.parse(localProducts)),
      });
    }
  }, [loading]);

  const generateRandomString = useMemo(
    () => (length = 10) => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result = "";
      for (let i = 0; i < length; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
      return result;
    },
    []
  );

  const confirmPurchase = async () => {
    if (!user || !selectedAccount) return;
    setLoading(true);
    try {
      const numberOrder = generateRandomString();
      const totalQuantity = products.reduce((sum, item) => sum + item.quantity, 0);
      await createSale({
        ...user,
        products: products.map((item) => ({
          ...item,
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
        })),
        quantity: totalQuantity + "",
        status: "Pago pendiente",
        purchase_date: new Date(),
        order_number: numberOrder,
        type_purchase: "online",
        payment_method: "bank_transfer_" + selectedAccount.bank.toLowerCase(),
      });
      await createTransfer({
        products: products.map(({ product, variant, quantity }) => ({
          name: product.title,
          image: product.image_product,
          price: product.discount_price || product.price,
          variant,
          quantity: quantity + "",
        })),
        bank: selectedAccount.bank,
        account_number: selectedAccount.accountNumber,
        account_type: selectedAccount.accountType,
        id: selectedAccount.holderId,
        to: user.email,
        from: "muebleselectrodomesticos27@gmail.com",
        client: user.first_name + " " + user.last_name,
        total: totalSum(products),
        date: getDate(),
      });
      toast.success("Pedido registrado");
      handleDialogClose();
      localStorage.setItem("numberOrder", numberOrder);
      localStorage.setItem("selectedAccount", JSON.stringify(selectedAccount));
      localStorage.setItem("shopping-user", JSON.stringify(user));
      localStorage.setItem(
        "shopping-products",
        JSON.stringify(
          products.map((item) => ({
            ...item,
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
          }))
        )
      );
      clearProducts();
      setUser(undefined);
      setSuccessfulPurchase(true);
    } catch {
      toast.error("Hubo un error al confirmar el pedido");
    } finally {
      setLoading(false);
    }
  };

  if (successfulPurchase) return <TransferDetails details={details} />;

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-ivory border-b border-warm-border">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="flex flex-col gap-4"
          >
            <Link
              href="/checkout"
              className="inline-flex items-center gap-2 text-sm text-warm-gray hover:text-charcoal transition-colors w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al checkout
            </Link>
            <div className="gold-line" />
            <p className="text-xs text-gold tracking-[0.2em] uppercase">Pago por transferencia</p>
            <h1 className="text-3xl text-charcoal" style={{ fontFamily: "var(--font-bold)" }}>
              Selecciona tu banco
            </h1>
            <p className="text-sm text-warm-gray">
              Elige la cuenta a la que realizarás la transferencia y confirma tu pedido.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bank cards */}
      <div className="max-w-2xl mx-auto px-6 py-12 flex flex-col gap-4">
        {bankAccounts.map((account, i) => {
          const meta = BANK_META[account.bank] ?? BANK_META["Bancolombia"];
          return (
            <motion.div
              key={account.accountNumber}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease }}
              className="bg-ivory border border-warm-border rounded-3xl p-6 flex flex-col gap-5 hover:border-gold/30 transition-colors duration-200"
            >
              {/* Bank header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${meta.bg}`}>
                    <Building2 className={`w-5 h-5 ${meta.accent}`} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-base text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>
                      {account.bank}
                    </p>
                    <span className={`text-[10px] border rounded-full px-2 py-0.5 ${meta.badge}`} style={{ fontFamily: "var(--font-semibold)" }}>
                      {account.accountType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Account number */}
              <div className="bg-cream rounded-2xl border border-warm-border px-5 py-4 flex flex-col gap-1">
                <p className="text-[10px] text-warm-gray uppercase tracking-[0.12em]" style={{ fontFamily: "var(--font-semibold)" }}>
                  Número de cuenta
                </p>
                <p className="text-2xl text-charcoal tracking-widest" style={{ fontFamily: "var(--font-bold)", letterSpacing: "0.08em" }}>
                  {account.accountNumber}
                </p>
              </div>

              {/* Holder info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-warm-border/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-warm-gray" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] text-warm-gray uppercase tracking-wide">Titular</p>
                    <p className="text-sm text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>{account.holderName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-warm-border/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Hash className="w-3.5 h-3.5 text-warm-gray" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] text-warm-gray uppercase tracking-wide">Cédula</p>
                    <p className="text-sm text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>{account.holderId}</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.015, backgroundColor: "#c9a86a" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleConfirmClick(account)}
                className="w-full flex items-center justify-center gap-2 bg-gold text-white py-3 rounded-xl text-sm tracking-wide transition-colors duration-200"
              >
                <CreditCard className="w-4 h-4" strokeWidth={1.5} />
                Seleccionar y confirmar pedido
              </motion.button>
            </motion.div>
          );
        })}

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-xs text-warm-gray text-center leading-relaxed px-4"
        >
          Al confirmar, tu pedido se registrará en nuestro sistema. Tendrás <span className="text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>48 horas</span> para realizar la transferencia, de lo contrario será cancelado.
        </motion.p>
      </div>

      {/* Confirmation modal */}
      <AnimatePresence>
        {isDialogOpen && selectedAccount && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
              onClick={handleDialogClose}
            />

            {/* Dialog */}
            <motion.div
              key="dialog"
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative bg-ivory border border-warm-border rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md mx-0 sm:mx-6 p-7 flex flex-col gap-5 z-10"
            >
              {/* Close */}
              <button
                onClick={handleDialogClose}
                disabled={loading}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-cream border border-warm-border flex items-center justify-center hover:border-charcoal/20 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-warm-gray" />
              </button>

              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-gold" strokeWidth={1.5} />
              </div>

              <div>
                <h2 className="text-lg text-charcoal mb-1.5" style={{ fontFamily: "var(--font-bold)" }}>
                  Confirmar selección de pago
                </h2>
                <p className="text-sm text-warm-gray leading-relaxed">
                  Estás a punto de registrar tu pedido con pago por transferencia a:
                </p>
              </div>

              {/* Selected bank summary */}
              <div className="bg-cream border border-warm-border rounded-2xl px-5 py-4 flex flex-col gap-2">
                <p className="text-xs text-warm-gray uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-semibold)" }}>Banco seleccionado</p>
                <p className="text-base text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>{selectedAccount.bank}</p>
                <p className="text-sm text-warm-gray tracking-wider">{selectedAccount.accountNumber}</p>
              </div>

              {/* Warning */}
              <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-xs text-amber-700 leading-relaxed">
                  Tendrás <strong>48 horas</strong> para realizar la transferencia. Pasado ese tiempo, tu pedido será cancelado automáticamente.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDialogClose}
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl border border-warm-border text-sm text-warm-gray hover:text-charcoal hover:border-charcoal/20 transition-colors"
                >
                  Cancelar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.015, backgroundColor: "#c9a86a" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={confirmPurchase}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-gold text-white py-3 rounded-xl text-sm tracking-wide transition-colors duration-200 disabled:opacity-60"
                >
                  {loading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Procesando…</>
                    : <><CheckCircle2 className="w-4 h-4" strokeWidth={1.5} /> Confirmar pedido</>
                  }
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BankTransfer;
