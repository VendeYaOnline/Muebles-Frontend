import { CreditCard, Headphones, ShieldCheck } from "lucide-react";
import classes from "./Services.module.css";

export default function Services() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-28">
      <div className={classes["container-services"]}>
        <div className="flex items-center space-x-4">
          <div>
            <ShieldCheck size={50} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="sm:text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">
              Términos de Garantía
            </h3>
            <p className="text-muted-foreground">Garantía de los productos</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <CreditCard size={50} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="sm:text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">
              Pago Transfrencia
            </h3>
            <p className="text-muted-foreground">Pago 100% seguro</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <Headphones size={50} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="sm:text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">
              Soporte
            </h3>
            <p className="text-muted-foreground">Asistencia por Whatsapp</p>
          </div>
        </div>
      </div>
    </section>
  );
}
