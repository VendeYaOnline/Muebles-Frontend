"use client";
import {
  Banner,
  CategoriesGrid,
  Category,
  ProductCarousel,
  Services,
} from "@/components";
import IconWhatsapp from "/public/whatsapp.png";
import Image from "next/image";

export default function TiendaElegante() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <Banner />
      <Services />
      <Category />
      <CategoriesGrid />
      <ProductCarousel />
      <a
        href="https://wa.me/+573204586138?text=Hola,%20estaba%20visitando%20la%20página%20de%20muebles%20y%20electrodomésticos%20del%20meta%20y%20me%20gustaría%20recibir%20ayuda."
        target="_blank"
      >
        <div className="bg-green-400 hover:bg-green-500 duration-300 rounded-full h-14 w-14 fixed bottom-5 right-5 flex justify-center items-center">
          <Image
            src={IconWhatsapp}
            width={35}
            height={35}
            alt="icono de whatsapp"
            priority
          />
        </div>
      </a>
    </div>
  );
}
