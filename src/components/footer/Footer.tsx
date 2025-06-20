"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import IconVisa from "/public/icons/visa.svg";
import IconMasterCard from "/public/icons/mastercard.svg";
import IconPse from "/public/icons/pse.png";
import IconEfecty from "/public/icons/efecty.png";
import IconBbva from "/public/logo-bbva.png";
import IconBancolombia from "/public/logo-bancolombia.svg";
import Image from "next/image";

const Footer = () => {
  const pathname = usePathname();
  return (
    pathname !== "/17312678/admin" && (
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Muebles y Electrodomésticos del Meta
              </h3>
              <p className="text-gray-400">
                Transformando hogares con estilo desde 1998.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="text-gray-400 hover:text-white"
                  >
                    Productos
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-white"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">
                Atención al cliente
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white">
                    Preguntas frecuentes
                  </Link>
                </li>

                <li>
                  <Link
                    href="/terms-conditions"
                    className="text-gray-400 hover:text-white"
                  >
                    Términos y condiciones
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Medios de pago</h4>
              <div className="flex space-x-4 flex-wrap gap-3">
                <Image
                  src={IconBbva}
                  width={50}
                  height={50}
                  alt="icono de bbva"
                  style={{ width: 60, height: 20 }}
                />
                <Image
                  src={IconBancolombia}
                  width={30}
                  height={30}
                  alt="icono de bancolombia"
                  style={{ width: 30, height: 30 }}
                />
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2023 Muebles y Electrodomésticos del Meta. Todos los
              derechos reservados.
            </p>
            <span className="text-xs">
              Desarrollado por{" "}
              <Link href="https://vendeyaonline.com/" target="_blank">
                <strong>VendeYaOnline</strong>
              </Link>
            </span>
          </div>
        </div>
      </footer>
    )
  );
};

export default Footer;
