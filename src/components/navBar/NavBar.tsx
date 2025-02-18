"use client";

import { Menu, ShoppingCart, X } from "lucide-react";
import { Button } from "../ui/button";
import React, { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import ActiveLink from "../active-link/ActiveLink";
import { useCategory, useProducts } from "@/hooks";
import ImageSalas from "/public/menu/salas.jpeg";
import ImageComedores from "/public/menu/comedores.png";
import ImageCocina from "/public/menu/cocina.png";
import ImageElectro from "/public/menu/electrodomesticos.png";
import Logo from "/public/logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { useCart } from "@/app/dashboard/hooks";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { products } = useProducts();
  const pathname = usePathname();
  const { active, setActive } = useCart();
  const { setCategories } = useCategory();

  const sumTotal = () =>
    useMemo(() => {
      let cant = 0;
      products.forEach((product) => {
        cant += product.quantity;
      });

      return cant;
    }, [products]);

  return (
    pathname !== "/17312678/admin" && (
      <div>
        <nav className="bg-white shadow-md fixed top-0 w-full z-20">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex">
                <Link href="/">
                  <Image src={Logo} alt="logo" width={80} height={40} />
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="menu-triguer">
                        Salas
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="flex p-4 gap-8 md:w-[400px] lg:w-[500px] bg-white">
                          <Image
                            src={ImageSalas}
                            alt="salas"
                            width={100}
                            height={250}
                            style={{ width: "auto", height: "auto" }}
                            className="rounded-md"
                          />

                          <ul className="grid lg:grid-cols-2 colum gap-x-8">
                            <Link
                              href="/products"
                              title="Sofás"
                              className="text-slate-800 hover:font-semibold"
                              onClick={() =>
                                setCategories(["Sofás".toUpperCase()])
                              }
                            >
                              Sofás
                            </Link>
                            <Link
                              href="/products"
                              title="Juegos de sala"
                              className="text-slate-800 hover:font-semibold"
                              onClick={() =>
                                setCategories(["Juegos de sala".toUpperCase()])
                              }
                            >
                              Juegos de sala
                            </Link>
                            <Link
                              href="/products"
                              title="Typography"
                              className="text-slate-800 hover:font-semibold"
                              onClick={() =>
                                setCategories([
                                  "Sillas de escritorio".toUpperCase(),
                                ])
                              }
                            >
                              Sillas de escritorio
                            </Link>

                            <Link
                              href="/products"
                              title="Typography"
                              className="text-slate-800 hover:font-semibold"
                              onClick={() =>
                                setCategories(["Sofá camas".toUpperCase()])
                              }
                            >
                              Sofá camas
                            </Link>

                            <Link
                              href="/products"
                              title="Typography"
                              className="text-slate-800 hover:font-semibold"
                              onClick={() =>
                                setCategories(["Mesas de centro".toUpperCase()])
                              }
                            >
                              Mesas de centro
                            </Link>
                          </ul>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="menu-triguer">
                        Cocina
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="flex p-4 gap-8 md:w-[400px] lg:w-[500px] bg-white">
                          <Image
                            src={ImageCocina}
                            alt="salas"
                            width={100}
                            height={250}
                            style={{ width: "auto", height: "auto" }}
                            className="rounded-md"
                          />

                          <ul className="grid lg:grid-cols-2 colum gap-x-8">
                            <Link
                              href="/products"
                              className="text-slate-800 hover:font-semibold"
                              onClick={() =>
                                setCategories(["Estufas".toUpperCase()])
                              }
                            >
                              Estufas
                            </Link>
                            <Link
                              href="/products"
                              className="text-slate-800 hover:font-semibold"
                              onClick={() =>
                                setCategories(["Vajillas".toUpperCase()])
                              }
                            >
                              Vajillas
                            </Link>
                            <Link
                              href="/products"
                              className="text-slate-800 hover:font-semibold"
                              onClick={() =>
                                setCategories(["Cubiertos".toUpperCase()])
                              }
                            >
                              Cubiertos
                            </Link>

                            <Link
                              href="/products"
                              className="text-slate-800 hover:font-semibold"
                              onClick={() =>
                                setCategories(["Licuadoras".toUpperCase()])
                              }
                            >
                              Licuadoras
                            </Link>

                            <Link
                              href="/products"
                              className="text-slate-800 hover:font-semibold"
                              onClick={() =>
                                setCategories(["Juego de ollas".toUpperCase()])
                              }
                            >
                              Juego de ollas
                            </Link>
                            <Link
                              href="/products"
                              className="text-slate-800 hover:font-semibold"
                              onClick={() =>
                                setCategories(["Sartenes".toUpperCase()])
                              }
                            >
                              Sartenes
                            </Link>
                          </ul>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="menu-triguer">
                        Comedores
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="flex p-4 gap-8 md:w-[400px] lg:w-[500px] bg-white">
                          <Image
                            src={ImageComedores}
                            alt="salas"
                            width={100}
                            height={250}
                            style={{ width: "auto", height: "auto" }}
                            className="rounded-md"
                          />

                          <ul className="grid lg:grid-cols-1">
                            <Link
                              href="/products"
                              className="text-slate-800 hover:font-semibold"
                              onClick={() =>
                                setCategories(["Sillas".toUpperCase()])
                              }
                            >
                              Sillas
                            </Link>
                            <Link
                              href="/products"
                              className="text-slate-800 hover:font-semibold"
                              onClick={() =>
                                setCategories(["Mesa rimax".toUpperCase()])
                              }
                            >
                              Mesa rimax
                            </Link>
                            <Link
                              href="/products"
                              className="text-slate-800 hover:font-semibold"
                              onClick={() =>
                                setCategories([
                                  "Juegos de comedor".toUpperCase(),
                                ])
                              }
                            >
                              Juegos de comedor
                            </Link>
                          </ul>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="menu-triguer">
                        Electrodomésticos
                      </NavigationMenuTrigger>

                      <NavigationMenuContent>
                        <div className="flex p-4 gap-8 md:w-[400px] lg:w-[500px] bg-white">
                          <Image
                            src={ImageElectro}
                            alt="salas"
                            width={100}
                            height={250}
                            style={{ width: "auto", height: "auto" }}
                            className="rounded-md"
                          />

                          <ul className="grid lg:grid-cols-2">
                            <Link
                              href="/products"
                              className="text-slate-800 hover:font-semibold"
                              onClick={() =>
                                setCategories(["Neveras".toUpperCase()])
                              }
                            >
                              Neveras
                            </Link>
                            <Link
                              href="/products"
                              className="text-slate-800 hover:font-semibold"
                              onClick={() =>
                                setCategories(["Televisores".toUpperCase()])
                              }
                            >
                              Televisores
                            </Link>
                            <Link
                              href="/products"
                              className="text-slate-800 hover:font-semibold"
                              onClick={() =>
                                setCategories(["Equipos".toUpperCase()])
                              }
                            >
                              Equipos
                            </Link>

                            <Link
                              href="/products"
                              className="text-slate-800 hover:font-semibold"
                              onClick={() =>
                                setCategories(["Portatiles".toUpperCase()])
                              }
                            >
                              Portatiles
                            </Link>
                            <Link
                              href="/products"
                              className="text-slate-800 hover:font-semibold"
                              onClick={() =>
                                setCategories(["Planchas".toUpperCase()])
                              }
                            >
                              Planchas
                            </Link>

                            <Link
                              href="/products"
                              className="text-slate-800 hover:font-semibold"
                              onClick={() =>
                                setCategories(["Lavadoras".toUpperCase()])
                              }
                            >
                              Lavadoras
                            </Link>
                          </ul>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
              <div className="hidden sm:flex sm:items-center sm:space-x-4 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActive(!active)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Carrito</span>
                  <div className="bg-indigo-500 h-5 w-5 rounded-full overflow-hidden text-xs text-white absolute left-5 bottom-4 flex justify-center items-center">
                    {sumTotal()}
                  </div>
                </Button>
              </div>
              <div className="flex items-center sm:hidden">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setActive(!active)}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Carrito</span>
                    <div className="bg-indigo-500 h-5 w-5 rounded-full overflow-hidden text-xs text-white absolute left-5 bottom-4 flex justify-center items-center">
                      {sumTotal()}
                    </div>
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                  <span className="sr-only">Menú</span>
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="sm:hidden absolute z-30 bg-white w-full border-b border-t-0 border-gray-300">
            <div className="pt-2 pb-3 space-y-1">
              <ActiveLink
                href="/"
                onClick={() => setIsMenuOpen(false)}
                activeClassName="text-indigo-600"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Inicio
              </ActiveLink>

              <ActiveLink
                href="/products"
                onClick={() => setIsMenuOpen(false)}
                activeClassName="text-indigo-600"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Productos
              </ActiveLink>

              <ActiveLink
                href="/offers"
                onClick={() => setIsMenuOpen(false)}
                activeClassName="text-indigo-600"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Ofertas
              </ActiveLink>

              <ActiveLink
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                activeClassName="text-indigo-600"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Contacto
              </ActiveLink>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default NavBar;
