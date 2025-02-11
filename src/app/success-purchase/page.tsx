import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";



const SuccessPurchase = () => {
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
       {/*  <CardContent>
          <div className="grid gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Datos del Comprador
              </h3>
              <div className="grid gap-2">
                <p>
                  <span className="font-medium">Nombre:</span> {first_name}{" "}
                  {last_name}
                </p>
                <p>
                  <span className="font-medium">Teléfono:</span> {phone}
                </p>
                <p>
                  <span className="font-medium">Correo electrónico:</span>{" "}
                  {email}
                </p>
                <p>
                  <span className="font-medium">Número de identificación:</span>{" "}
                  {id_number}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Dirección de Envío</h3>
              <div className="grid gap-2">
                <p>
                  <span className="font-medium">Departamento:</span>{" "}
                  {department}
                </p>
                <p>
                  <span className="font-medium">Ciudad:</span> {city}
                </p>
                <p>
                  <span className="font-medium">Dirección:</span> {address}
                </p>
                <p>
                  <span className="font-medium">Información adicional:</span>{" "}
                  {additional_info}
                </p>
              </div>
            </div>

            <h1>NÚMERO DE LA ORDEN: 2342344</h1>
          </div>
        </CardContent> */}
      </Card>
    </div>
  );
};

export default SuccessPurchase;
