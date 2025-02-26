"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, CreditCard, Clock, CircleCheck, Download } from "lucide-react";
import ProductList from "./components/ProductList";
import { ProductSale } from "@/app/dashboard/interfaces";
import { Button } from "../ui/button";

interface Props {
  details: {
    total: string;
    numberOrder: string;
    user?:
      | {
          first_name: string;
          last_name: string;
          phone: string;
          department: string;
          city: string;
          address: string;
          additional_info: string;
          email: string;
          id_number: string;
        }
      | undefined;
    products: ProductSale[];
    selectedAccount: {
      accountNumber: string;
      accountType: string;
      bank: string;
      holderName: string;
      holderId: string;
    } | null;
  };
}

const TransferDetails = ({ details }: Props) => {
  const handleDownload = () => {
    const content = `
      <html>
        <head>
          <title>Detalles de la Orden - ${details.numberOrder}</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'Inter', sans-serif;
            }
          </style>
        </head>
        <body>
          <h2>Detalles de la orden: ${details.numberOrder}</h2>
          <p><strong>Banco:</strong> ${details.selectedAccount?.bank}</p>
          <p><strong>Tipo de cuenta:</strong> ${details.selectedAccount?.accountType}</p>
          <p><strong>Número de cuenta:</strong> ${details.selectedAccount?.accountNumber}</p>
          <p><strong>Número de identificación del titular:</strong> ${details.selectedAccount?.holderId}</p>
          <p><strong>Total:</strong> ${details.total}</p>
        </body>
      </html>
    `;

    const printWindow = window.open("", "", "width=600,height=400");
    printWindow?.document.write(content);
    printWindow?.document.close();
    printWindow?.print();
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-5">
            <CircleCheck color="#77B254" size={35} />
            Confirmación de selección de pago
          </CardTitle>
          <CardDescription>
            Gracias por elegir la transferencia bancaria como método de pago.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>
            Hemos recibido tu solicitud y estamos esperando la confirmación de
            la transferencia para completar tu pedido. Te enviaremos un mensaje
            de confirmación una vez que hayamos recibido el pago.
          </p>

          <div className="bg-muted p-4 rounded-lg space-y-4">
            <h3 className="font-semibold text-lg">Instrucciones de pago</h3>
            <p>
              Para completar tu compra, por favor realiza una transferencia
              bancaria a la siguiente cuenta:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Banco:</strong> {details.selectedAccount?.bank}
              </li>
              <li>
                <strong>Número de cuenta:</strong>{" "}
                {details.selectedAccount?.accountNumber}
              </li>
              <li>
                <strong>Titular de la cuenta:</strong>{" "}
                {details.selectedAccount?.holderName}
              </li>

              <li>
                <strong>Cedula del titular:</strong>{" "}
                {details.selectedAccount?.holderId}
              </li>
              <li>
                <strong>Monto:</strong> {details.total}
              </li>
            </ul>
            <p className="flex flex-col gap-2">
              <Mail className="h-5 w-5" />
              Una vez que hayas realizado la transferencia, por favor envíanos
              el comprobante de pago por WhatsApp al número 3204586138,
              incluyendo el número de orden:{" "}
              <strong>{details.numberOrder}</strong>
            </p>

            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Descargar detalles
            </Button>
          </div>

          <div
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
            role="alert"
          >
            <p className="font-bold flex items-center">
              <Clock className="mr-2 h-5 w-5" /> Recordatorio importante
            </p>
            <p>
              Tienes 48 horas para realizar la transferencia. Después de este
              tiempo, tu pedido podría ser cancelado.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="products">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Detalles de la compra
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ProductList
                  products={details.products}
                  total={details.total}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransferDetails;
