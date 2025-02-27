"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Contacto() {
  return (
    <div className="min-h-screen mt-16 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container max-w-6xl mx-auto px-4 py-12 border-t-red-400">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            CONTÁCTANOS
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Ponte en contacto con nosotros para
            cualquier consulta, sugerencia o información adicional sobre
            nuestros productos y servicios.
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-8 mb-12">
          {/* Información de contacto */}
          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
                <CardDescription>
                  Encuentra todas las formas de comunicarte con nosotros
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Dirección</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Calle 9 # 11-39 - Barrios los fundadores
                      <br />
                      Villanueva - Casanare, Colombia
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Teléfonos moviles</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      3204586138
                      <br />
                      3103435659
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Correo Electrónico</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      muebleselectrodomesticos27@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Horario de Atención</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Lunes a Sábados: 8:00 AM - 8:00 PM
                      <br />
                      Domingo: 8:00 AM - 12:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Nuestra Ubicación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-200 dark:bg-slate-700 rounded-lg h-[400px] flex items-center justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497.1135461495629!2d-72.93007751505677!3d4.610420565907881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e153b1f1f339ced%3A0xaa7c6935b0fd6da7!2sMUEBLES%20Y%20ELECTRODOM%C3%89STICOS%20DEL%20META!5e0!3m2!1ses!2sco!4v1740682927325!5m2!1ses!2sco"
                    width="100%"
                    height="100%"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: 0 }}
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <hr className="my-10" />
        <div className="text-center text-slate-600 dark:text-slate-400">
          <p>
            © {new Date().getFullYear()} MuebleHogar. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
