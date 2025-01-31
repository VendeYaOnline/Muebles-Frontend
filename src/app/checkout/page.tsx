"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useProducts } from "@/hooks";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../dashboard/hooks";
import { totalSum } from "@/utils";

const Checkout = () => {
  const { products } = useProducts();
  const { setActive } = useCart();
  const navigator = useRouter();
  const total = totalSum(products);

  useEffect(() => {
    if (!products.length) {
      navigator.push("/products");
    }
  }, [products]);

  useEffect(() => {
    setActive(false);
  }, []);

  return (
    products.length > 0 && (
      <div className="container mx-auto px-4 py-8 mt-48 mb-80">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product List Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Tus productos</h2>
            <div className="space-y-4 max-h-[480px] overflow-auto">
              {products.map(({ product, quantity, variant }) => (
                <Card key={product.id} className="mr-2">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="relative h-24 w-32 flex-shrink-0">
                      <Image
                        src={product.image_product}
                        alt={product.title}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        fill // Reemplaza layout="fill" (usa el nuevo atributo fill)
                        placeholder="blur" // Activa el placeholder
                        blurDataURL="data:image/svg+xml;base64,<BASE_64_STRING>" // Opcional
                        quality={75} // Ajusta la calidad
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{product.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Categoria: {product.Categories[0].name}
                          </p>

                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            Color:
                            <div
                              className="color"
                              style={{ backgroundColor: variant }}
                            />
                          </div>

                          <p className="text-sm text-muted-foreground">
                            Cantidad: {quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-semibold">{product.price}</span>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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
                    <span className="font-semibold">{products.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Price de envío
                    </span>
                    <span className="font-semibold text-green-600">Gratis</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Promo</span>
                    <span className="font-semibold">$18.00</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-semibold">{total}</span>
                    </div>
                  </div>
                  <div className="space-y-4 pt-4">
                    <Button className="w-full text-white bg-black hover:bg-gray-800">
                      Pagar ahora
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  );
};

export default Checkout;
