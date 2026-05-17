"use client";

import {
  Banner,
  CategoriesGrid,
  Category,
  ProductCarousel,
  Services,
} from "@/components";
import FeaturedProducts from "@/components/featured-products/FeaturedProducts";
import IconWhatsapp from "/public/whatsapp.png";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream overflow-hidden">
      <Banner />
      <Services />
      <Category />
      <CategoriesGrid />
      <FeaturedProducts />
      <ProductCarousel />

      {/* WhatsApp floating button */}
      <motion.a
        href="https://wa.me/+573204586138?text=Hola,%20estaba%20visitando%20la%20página%20de%20muebles%20y%20electrodomésticos%20del%20meta%20y%20me%20gustaría%20recibir%20ayuda."
        target="_blank"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4, type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="relative">
          {/* Ripple effect */}
          <motion.div
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
            className="absolute inset-0 bg-green-400 rounded-full"
          />
          <div className="relative bg-green-500 hover:bg-green-600 transition-colors duration-300 rounded-full h-14 w-14 flex justify-center items-center shadow-lg shadow-green-500/30">
            <Image
              src={IconWhatsapp}
              width={30}
              height={30}
              alt="WhatsApp"
              priority
            />
          </div>
        </div>
      </motion.a>
    </div>
  );
}
