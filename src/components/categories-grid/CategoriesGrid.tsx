import Image from "next/image";
import Link from "next/link";
import Image1 from "/public/interiores.jpg";
import Image2 from "/public/dormitorios.jpg";
import Image3 from "/public/cocina.png";
import Image4 from "/public/electrodomesticos.jpg";
import { useCategory } from "@/hooks";

export default function CategoriesGrid() {
  const { setCategories } = useCategory();
  const navigationCategory = (category: string[]) => {
    setCategories(category);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 md:text-left lg:text-left xl:text-left text-center">
      <h1 className="sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl text-2xl font-bold text-primary mb-2">
        Nuestra referencias
      </h1>
      <p className="text-muted-foreground mb-8">
        Encuentra todo lo que necesitas para tu hogar
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/products"
          onClick={() =>
            navigationCategory([
              "COMEDORES",
              "JUEGOS DE SALA",
              "MESA DE CENTRO",
              "JUEGOS DE COMEDOR",
              "SOFÁ CAMAS",
            ])
          }
          className="group relative overflow-hidden rounded-lg aspect-[4/3]"
        >
          <Image
            src={Image1}
            alt="Interiores"
            className="object-cover transition-transform group-hover:scale-105"
            fill
          />
          <div className="absolute inset-0 bg-black/30" />
          <h2 className="absolute bottom-6 left-6 sm:text-lg lg:text-2xl xl:text-4xl font-bold text-white">
            Interiores
          </h2>
        </Link>

        <Link
          href="/products"
          onClick={() =>
            navigationCategory([
              "ESTUFAS",
              "LICUADORAS",
              "VAJILLAS",
              "JUEGO DE OLLAS",
              "LICUADORAS",
              "SARTENES",
              "CUBIERTOS",
            ])
          }
          className="group relative overflow-hidden rounded-lg aspect-[4/3]"
        >
          <Image
            src={Image3}
            alt="Cocina"
            className="object-cover transition-transform group-hover:scale-105"
            fill
          />
          <div className="absolute inset-0 bg-black/30" />
          <h2 className="absolute bottom-6 left-6 sm:text-lg lg:text-2xl xl:text-4xl font-bold text-white">
            Cocina
          </h2>
        </Link>

        <Link
          href="/products"
          onClick={() =>
            navigationCategory([
              "ARMARIOS",
              "BASE CAMAS",
              "COLCHONES",
              "SILLAS DE ESCRITORIO",
              "CLOSETS",
              "SOFÁS",
              "SILLAS",
              "MESA DE CENTRO",
            ])
          }
          className="group relative overflow-hidden rounded-lg aspect-[4/3]"
        >
          <Image
            src={Image2}
            alt="Dormitorios"
            className="object-cover transition-transform group-hover:scale-105"
            fill
          />
          <div className="absolute inset-0 bg-black/30" />
          <h2 className="absolute bottom-6 left-6 sm:text-lg lg:text-2xl xl:text-4xl font-bold text-white">
            Dormitorios
          </h2>
        </Link>

        <Link
          href="/products"
          onClick={() =>
            navigationCategory([
              "PORTATILES",
              "TELEVISORES",
              "NEVERAS",
              "LAVADORAS",
              "EQUIPOS DE SONIDO",
              "PLANCHAS",
            ])
          }
          className="group relative overflow-hidden rounded-lg aspect-[4/3]"
        >
          <Image
            src={Image4}
            alt="electrodomésticos"
            className="object-cover transition-transform group-hover:scale-105"
            fill
          />
          <div className="absolute inset-0 bg-black/30" />
          <h2 className="absolute bottom-6 left-6 sm:text-lg lg:text-2xl xl:text-4xl font-bold text-white">
            Electrodomésticos
          </h2>
        </Link>
      </div>
    </div>
  );
}
