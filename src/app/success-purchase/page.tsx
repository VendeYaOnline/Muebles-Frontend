"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";

const SuccessPurchaseContent = () => {
  const searchParams = useSearchParams();
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const id = searchParams.get("payment_id");
    if (id) {
      setPaymentId(id);
    } else {
      setError(true);
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!paymentId) return;

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.mercadopago.com/v1/payments/${paymentId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_ACCESS_TOKEN}`,
            },
          }
        );

        if (data.metadata) {
          setData(data.metadata);
        } else {
          setError(true);
        }

        if (data.order?.id) {
          setOrderId(data.order.id);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [paymentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-gray-600 text-lg font-semibold">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-600">
              Error al obtener los datos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-gray-600">
            No se encontró el identificador de pago. Intenta de nuevo o contacta
            soporte.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">
            ¡Compra Realizada con Éxito!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Datos del Comprador
              </h3>
              <div className="grid gap-2">
                <p>
                  <span className="font-medium">Nombre:</span>{" "}
                  {data?.first_name} {data?.last_name}
                </p>
                <p>
                  <span className="font-medium">Teléfono:</span> {data?.phone}
                </p>
                <p>
                  <span className="font-medium">Correo electrónico:</span>{" "}
                  {data?.email}
                </p>
                <p>
                  <span className="font-medium">Número de identificación:</span>{" "}
                  {data?.id_number}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Dirección de Envío</h3>
              <div className="grid gap-2">
                <p>
                  <span className="font-medium">Departamento:</span>{" "}
                  {data?.department}
                </p>
                <p>
                  <span className="font-medium">Ciudad:</span> {data?.city}
                </p>
                <p>
                  <span className="font-medium">Dirección:</span>{" "}
                  {data?.address}
                </p>
                <p>
                  <span className="font-medium">Información adicional:</span>{" "}
                  {data?.additional_info}
                </p>
              </div>
            </div>
            {orderId && (
              <h1 className="text-lg font-bold text-gray-700">
                NÚMERO DE LA ORDEN: {orderId}
              </h1>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SuccessPurchase = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SuccessPurchaseContent />
    </Suspense>
  );
};

export default SuccessPurchase;
