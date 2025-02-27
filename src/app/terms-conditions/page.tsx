"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TermsAndConditions() {
  const [storeName] = useState("Muebles y Electrodomésticos del Meta");
  const [supportEmail] = useState("muebleselectrodomesticos27@gmail.com");
  const [country] = useState("Colombia");
  const [currency] = useState("COP");
  const [returnDays] = useState("10");

  return (
    <div className="h-screen mt-16  dark:from-slate-950 dark:to-slate-900 bg-gradient-to-b from-slate-50 to-slate-100 dark:bg-slate-800">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
              TÉRMINOS Y CONDICIONES DE USO
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mb-10">
              Última actualización: 27/02/2025
            </p>
            <hr />
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
            <p className="text-lg">
              Bienvenido a <span className="font-semibold">{storeName}</span> ,
              una tienda en línea especializada en la venta de muebles y
              electrodomésticos. Al acceder y utilizar nuestro sitio web, usted
              acepta los siguientes Términos y Condiciones. Si no está de
              acuerdo con ellos, le pedimos que no utilice nuestro servicio.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium">
                1. Introducción
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Bienvenido a{" "}
                  <span className="font-semibold">{storeName}</span>, una tienda
                  en línea especializada en la venta de muebles y
                  electrodomésticos. Al acceder y utilizar nuestro sitio web,
                  usted acepta los siguientes Términos y Condiciones. Si no está
                  de acuerdo con ellos, le pedimos que no utilice nuestro
                  servicio.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium">
                2. Uso del sitio web
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Nuestro sitio web permite a los usuarios comprar muebles y
                  electrodomésticos sin necesidad de registrarse. Sin embargo,
                  para procesar los envíos, es necesario que el cliente
                  proporcione datos de contacto y dirección de entrega.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium">
                3. Privacidad y protección de datos
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Nos comprometemos a proteger la información personal de
                  nuestros clientes. Los datos proporcionados solo se utilizarán
                  para gestionar la compra y el envío del producto. Bajo ninguna
                  circunstancia compartiremos esta información con terceros,
                  salvo que sea requerido por ley.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium">
                4. Productos y disponibilidad
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Los productos ofrecidos en nuestra tienda están sujetos a
                  disponibilidad. Nos reservamos el derecho de modificar,
                  actualizar o descontinuar productos sin previo aviso. En caso
                  de que un producto adquirido no esté disponible, se le
                  informará al cliente y se le ofrecerá un reemplazo o
                  reembolso.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-medium">
                5. Precios y pagos
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Los precios de los productos están indicados en {currency} e
                  incluyen los impuestos aplicables. Nos reservamos el derecho
                  de modificar los precios en cualquier momento. Los pagos se
                  realizan a través de los métodos de pago habilitados en
                  nuestro sitio web.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-lg font-medium">
                6. Envíos y entregas
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Los envíos se realizan a la dirección proporcionada por el
                  cliente en el momento de la compra. El tiempo de entrega puede
                  variar según la ubicación y disponibilidad del producto. No
                  nos hacemos responsables de retrasos ocasionados por terceros
                  o causas de fuerza mayor.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-lg font-medium">
                7. Devoluciones y reembolsos
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Si el cliente recibe un producto dañado o defectuoso, debe
                  notificarlo dentro de los {returnDays} días siguientes a la
                  entrega para gestionar un reemplazo o reembolso. Los productos
                  deben devolverse en su empaque original y sin uso.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-lg font-medium">
                8. Limitación de responsabilidad
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  No nos hacemos responsables por daños indirectos, incidentales
                  o consecuentes derivados del uso de nuestros productos o
                  servicios.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger className="text-lg font-medium">
                9. Modificaciones a los Términos y Condiciones
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Nos reservamos el derecho de modificar estos Términos y
                  Condiciones en cualquier momento. Se recomienda revisar esta
                  sección periódicamente.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger className="text-lg font-medium">
                10. Legislación aplicable
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Estos términos se rigen por las leyes de {country} y cualquier
                  disputa será resuelta ante los tribunales competentes de dicha
                  jurisdicción.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-10 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-4 mt-10">
              Si tienes alguna duda, puedes contactarnos a{" "}
              <a
                href={`mailto:${supportEmail}`}
                className="text-primary hover:underline"
              >
                <strong>{supportEmail}</strong>
              </a>
            </p>
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              Gracias por confiar en {storeName}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
