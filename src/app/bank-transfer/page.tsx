"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeftFromLine } from "lucide-react";
import { createSale } from "@/api/request";
import { useProducts, useUser } from "@/hooks";
import toast from "react-hot-toast";
import { convertCurrencyToNumber } from "../dashboard/functions";

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

const BankTransfer = () => {
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user, setUser } = useUser();
  const { products, clearProducts } = useProducts();
  const [loading, setLoading] = useState(false);

  const handleConfirmClick = (account: BankAccount) => {
    setSelectedAccount(account);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedAccount(null);
  };

  const generateRandomString = useMemo(
    () =>
      (length = 10) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      },
    []
  );

  const confirmPurchase = async () => {
    if (user) {
      setLoading(true);
      try {
        const totalQuantity = products.reduce((total, { quantity }) => {
          return (total += quantity);
        }, 0);
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
                ? convertCurrencyToNumber(item.product.discount_price) *
                    Number(item.quantity) +
                  ""
                : convertCurrencyToNumber(item.product.price) *
                    Number(item.quantity) +
                  "",
          })),
          quantity: totalQuantity + "",
          status: "Pago pendiente",
          purchase_date: new Date(),
          order_number: generateRandomString(),
          type_purchase: "online",
          payment_method:
            "bank_transfer_" + selectedAccount?.bank.toLowerCase(),
        });
        toast.success("Pago pendiente");
        handleDialogClose();
        clearProducts();
        setUser(undefined);
      } catch (error) {
        toast.error("Hubo un error con la confirmacion");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center">
      <Link href="/checkout">
        <button
          className={`absolute top-[90px] text-white py-[10px] px-[20px] left-5 rounded-[10px] bg-indigo-600 transition-all hover:bg-indigo-500`}
        >
          <ArrowLeftFromLine size={17} />
        </button>
      </Link>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Cuentas bancarias</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {bankAccounts.map((account) => (
            <Card key={account.accountNumber}>
              <CardHeader>
                <CardTitle className="text-2xl">{account.bank}</CardTitle>
                <CardDescription>{account.accountType}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">
                  {account.accountNumber}
                </p>
                <div className="text-sm text-muted-foreground mt-3">
                  <p>
                    <strong>Titular:</strong> {account.holderName}
                  </p>
                  <p>
                    <strong>Cédula:</strong> {account.holderId}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleConfirmClick(account)}
                  className={
                    account.bank === "BBVA"
                      ? "bg-blue-700 text-white hover:bg-blue-800"
                      : "bg-yellow-400 hover:bg-yellow-500 duration-300"
                  }
                >
                  Confirmar Medio de Pago
                </Button>
              </CardFooter>
            </Card>
          ))}

          <AlertDialog open={isDialogOpen}>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Estás a punto de seleccionar la cuenta bancaria de
                  <strong>
                    {" "}
                    {selectedAccount?.bank +
                      "-" +
                      selectedAccount?.accountNumber}
                  </strong>{" "}
                  Si confirmas, se generará un pedido en nuestro sistema con tu
                  compra. Recuerda que tienes
                  <strong> 48 horas</strong> para realizar la transferencia
                  bancaria, de lo contrario, la compra será cancelada.
                  <span className="mt-3 block">¿Deseas continuar?</span>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  disabled={loading}
                  onClick={handleDialogClose}
                >
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  disabled={loading}
                  onClick={() => confirmPurchase()}
                  className="bg-black text-white"
                >
                  {loading ? <div className="loader-2" /> : "Continuar"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </section>
  );
};

export default BankTransfer;
