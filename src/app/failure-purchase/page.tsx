import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const FailurePurchase = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <CheckCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600">
            ¡Hubo un problema con tu pago!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            Te recomendamos verificar los datos de tu método de pago e intentar
            nuevamente. Si el problema persiste, contacta con tu entidad
            financiera o prueba con otro método de pago.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FailurePurchase;
