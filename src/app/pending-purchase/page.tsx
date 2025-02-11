import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function PendingPurchase() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
            <CheckCircle className="h-8 w-8 text-yellow-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-yellow-600">
            ¡Estado de tu pago en proceso!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            Hemos recibido tu intento de pago a través de Mercado Pago, pero
            actualmente se encuentra en estado <strong>pendiente</strong>. Esto
            significa que estamos esperando la confirmación por parte de la
            entidad financiera.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
