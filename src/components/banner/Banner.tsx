import Image from "next/image";
import ImageBaner from "/public/baner.png";
import { Button } from "../ui/button";
import classes from "./Banner.module.css";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative bg-gray-900 overflow-hidden flex justify-center items-center flex-wrap">
      <div className="relative z-10 lg:max-w-2xl lg:w-full mt-20 sm:mt-20 md:mt-0 lg:mt-0 xl:mt-0 mb-10">
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className={classes["container-text"]}>
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Transforma tu hogar</span>
              <span className="block text-indigo-500">
                con estilo y confort
              </span>
            </h1>
            <p className="mt-5 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Descubre nuestra colección de muebles y electrodomésticos de alta
              calidad para crear el espacio perfecto que siempre has soñado.
            </p>
            <Link href="/products">
              <Button className="mt-8 flex items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 md:py-4 md:text-lg md:px-10">
                Ver catálogo
              </Button>
            </Link>
          </div>
        </main>
      </div>
      <Image
        src={ImageBaner}
        alt="Sala de estar moderna"
        width={800}
        height={800}
        style={{ height: "auto", width: "auto" }}
      />
    </div>
  );
};

export default Banner;
