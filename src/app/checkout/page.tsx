"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { initMercadoPago } from "@mercadopago/sdk-react";
import Image from "next/image";
import { useProducts, useUser } from "@/hooks";
import { CreditCard, Landmark, Minus, Plus, Trash2 } from "lucide-react";
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

const Checkout = () => {
  const {
    products,
    addProduct,
    removeProduct,
    deleteProduct,
    totalQuantity,
    totalDiscount,
  } = useProducts();
  const { setActive } = useCart();
  const navigator = useRouter();
  const total = totalSum(products);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useUser();

  useEffect(() => {
    if (!products.length) {
      navigator.push("/products");
    }
  }, [products]);

  useEffect(() => {
    setActive(false);
  }, []);

  useEffect(() => {
    if (user) {
      setCurrentStep(2);
    }
  }, [user]);

  //* INICIA LA CONFIGURACIÓN DE MERCADO PAGO
  initMercadoPago(process.env.NEXT_PUBLIC_API_KEY || "", {
    locale: "es-CO",
  });

  const handlePayment = async () => {
    setLoading(true);
    try {
      if (user) {
        const { init_point } = await createPreference(products, user);
        const date = getDate();
        await saveData(
          user.email,
          total,
          date,
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
                  ? convertCurrencyToNumber(item.product.discount_price) *
                      Number(item.quantity) +
                    ""
                  : convertCurrencyToNumber(item.product.price) *
                      Number(item.quantity) +
                    "",
            },
          }))
        );
        if (init_point) {
          window.location.href = init_point;
        }
      } else {
        toast.error("Completa todos los campos");
      }
    } catch (error) {
      console.log("Error al procesar el pago", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    products.length > 0 && (
      <div className="container mx-auto px-4 py-8 mt-48 mb-72">
        <Timeline
          steps={["Detalles del comprador", "Pagar"]}
          currentStep={currentStep}
        />
        {currentStep === 1 ? (
          <div className="mt-20">
            <FormUser setCurrentStep={setCurrentStep} />
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2 mt-36">
            {/* Product List Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Tus productos</h2>
              <div className="space-y-4 max-h-[480px] overflow-auto">
                {products.map(({ product, quantity, variant }, index) => (
                  <Card key={index} className="mr-2">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="relative h-24 w-32 flex-shrink-0">
                        <Image
                          src={product.image_product}
                          alt={product.title}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          fill
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml;base64,<BASE_64_STRING>"
                          quality={75}
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{product.title}</h3>
                            {product.Categories.length > 0 && (
                              <p className="text-sm text-muted-foreground">
                                Categoria: {product.Categories[0].name}
                              </p>
                            )}

                            {variant !== "" && (
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                Color:
                                <div
                                  className="color"
                                  style={{ backgroundColor: variant }}
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            {product.discount_price ? (
                              <>
                                <span className="font-semibold line-through">
                                  {product.price}
                                </span>
                                <span className="font-semibold">
                                  {product.discount_price}
                                </span>
                              </>
                            ) : (
                              <span className="font-semibold">
                                {product.price}
                              </span>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteProduct(product.id, variant)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => removeProduct(product.id, variant)}
                            className="rounded-full w-5 h-5 border border-gray-700 flex justify-center items-center"
                          >
                            <Minus size={13} />
                          </button>
                          <span>{quantity}</span>
                          <button
                            onClick={() => addProduct(product, variant)}
                            className="rounded-full w-5 h-5 border border-gray-700 flex justify-center items-center"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Summary Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Resumen detallado</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Total de productos
                      </span>
                      <span className="font-semibold">{totalQuantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Precio de envío
                      </span>
                      <span className="font-semibold text-green-600">
                        Gratis
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ahorraste</span>
                      <span className="font-semibold">{`$ ${totalDiscount.toLocaleString(
                        "es-CO"
                      )}`}</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-lg font-semibold">{total}</span>
                      </div>
                    </div>
                    <div className="space-y-4 pt-4">
                      {/*                       <Button
                        className="w-full text-white bg-indigo-600 hover:bg-indigo-700"
                        onClick={handlePayment}
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="loader" />
                        ) : (
                          <div className="flex items-center gap-3">
                            <span>
                              Pagar por tarjetas de crédito, débito y efecty
                            </span>
                            <CreditCard size={20} />
                          </div>
                        )}
                      </Button> */}
                      <Link href="/bank-transfer">
                        <Button
                          className="w-full text-white bg-blue-600 hover:bg-blue-700 mt-3"
                          disabled={loading}
                        >
                          <div className="flex items-center gap-3">
                            <span>Pagar por transferencia bancaria</span>
                            <Landmark size={20} />
                          </div>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="flex gap-2 w-full justify-center mt-10 m-auto">
            <Button
              onClick={() => setCurrentStep(1)}
              className="text-white bg-blue-600 hover:bg-blue-700"
            >
              Anterior
            </Button>
            <Button
              disabled
              className="text-white bg-blue-600 hover:bg-blue-700"
            >
              Siguiente
            </Button>
          </div>
        )}
      </div>
    )
  );
};

export default Checkout;
