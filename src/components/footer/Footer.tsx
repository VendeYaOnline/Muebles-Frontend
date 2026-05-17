"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import IconBbva from "/public/logo-bbva.png";
import IconBancolombia from "/public/logo-bancolombia.svg";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Facebook, Mail } from "lucide-react";

const footerLinks = {
  Navegación: [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/products" },
    { label: "Contacto", href: "/contact" },
  ],
  Soporte: [
    { label: "Preguntas frecuentes", href: "/faq" },
    { label: "Términos y condiciones", href: "/terms-conditions" },
  ],
};

const Footer = () => {
  const pathname = usePathname();

  if (pathname === "/17312678/admin") return null;

  return (
    <footer className="bg-warm-dark text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main footer grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 py-16 border-b border-white/5"
        >
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <div>
              <h3
                className="text-2xl tracking-widest text-white"
                style={{ fontFamily: "var(--font-bold)" }}
              >
                MEM
              </h3>
              <p className="text-[9px] tracking-[0.25em] text-white/30 uppercase mt-0.5">
                Muebles & Hogar
              </p>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Transformando hogares con estilo y calidad desde 1998. Tu espacio
              perfecto nos inspira.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Mail, label: "Email" },
              ].map(({ icon: Icon, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.1, backgroundColor: "#b8975a" }}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer transition-colors duration-200"
                >
                  <Icon className="w-4 h-4 text-white/50" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-4">
              <h4
                className="text-xs text-gold tracking-[0.15em] uppercase"
                style={{ fontFamily: "var(--font-semibold)" }}
              >
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Payment column */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-xs text-gold tracking-[0.15em] uppercase"
              style={{ fontFamily: "var(--font-semibold)" }}
            >
              Medios de pago
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5 w-fit">
                <Image
                  src={IconBancolombia}
                  width={24}
                  height={24}
                  alt="Bancolombia"
                  style={{
                    width: 24,
                    height: 24,
                    filter: "brightness(0) invert(1) opacity(0.6)",
                  }}
                />
                <span className="text-xs text-white/50">Bancolombia</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5 w-fit">
                <Image
                  src={IconBbva}
                  width={40}
                  height={16}
                  alt="BBVA"
                  style={{
                    width: 40,
                    height: 16,
                    filter: "brightness(0) invert(1) opacity(0.6)",
                  }}
                />
              </div>
            </div>
            <p className="text-xs text-white/30 leading-relaxed mt-1">
              Transferencia bancaria 100% segura
            </p>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="text-white/25 text-xs">
            © 2025 Muebles y Electrodomésticos del Meta. Todos los derechos
            reservados.
          </p>
          <span className="text-white/20 text-xs">
            Desarrollado por{" "}
            <Link
              href="https://vendeyaonline.com/"
              target="_blank"
              className="hover:text-gold transition-colors duration-200"
            >
              VendeYaOnline
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
