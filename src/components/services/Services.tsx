import { Package, CreditCard, Headphones } from "lucide-react";
import classes from "./Services.module.css";

export default function Services() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-28">
      <div className={classes["container-services"]}>
        <div className="flex items-center space-x-4">
          <div>
            <Package className="w-12 h-12 text-primary" size={50} />
          </div>
          <div>
            <h3 className="sm:text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">
              Envío Gratis
            </h3>
            <p className="text-muted-foreground">Sin cargo por cada entrega</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <CreditCard className="w-12 h-12 text-primary" />
          </div>
          <div>
            <h3 className="sm:text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">
              Pago Rápido
            </h3>
            <p className="text-muted-foreground">Pago 100% seguro</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <Headphones className="w-12 h-12 text-primary" />
          </div>
          <div>
            <h3 className="sm:text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">
              Soporte
            </h3>
            <p className="text-muted-foreground">Asistencia rápida</p>
          </div>
        </div>
      </div>
    </section>
  );
}
