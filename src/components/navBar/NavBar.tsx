"use client";

import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useCategory, useProducts } from "@/hooks";
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
import ActiveLink from "../active-link/ActiveLink";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { products } = useProducts();
  const pathname = usePathname();
  const { active, setActive } = useCart();
  const { setCategories } = useCategory();

  const cartCount = useMemo(() => {
    return products.reduce((total, product) => total + product.quantity, 0);
  }, [products]);

  const menuItems = [
    {
      title: "Salas",
      items: [
        "Sofás",
        "Juegos de sala",
        "Sillas de escritorio",
        "Sofá camas",
        "Mesas de centro",
      ],
    },
    {
      title: "Cocina",
      items: [
        "Estufas",
        "Vajillas",
        "Cubiertos",
        "Licuadoras",
        "Juego de ollas",
        "Sartenes",
      ],
    },
    {
      title: "Comedores",
      items: ["Sillas", "Mesa rimax", "Juegos de comedor"],
    },
    {
      title: "Electrodomésticos",
      items: [
        "Neveras",
        "Televisores",
        "Equipos",
        "Portatiles",
        "Planchas",
        "Lavadoras",
      ],
    },
  ];

  return (
    pathname !== "/17312678/admin" && (
      <nav className="bg-white shadow-lg fixed top-0 w-full z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src={Logo}
                  alt="Logo"
                  width={48}
                  height={48}
                  className="transition-transform hover:scale-105"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              <NavigationMenu>
                <NavigationMenuList className="space-x-2">
                  <NavigationMenuItem>
                    <Link
                      href="/"
                      className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    >
                      Inicio
                    </Link>
                  </NavigationMenuItem>
                  {menuItems.map((menu) => (
                    <NavigationMenuItem key={menu.title}>
                      <NavigationMenuTrigger className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium bg-transparent hover:bg-gray-100 transition-all duration-200">
                        {menu.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid grid-cols-2 gap-4 p-6 w-[400px] lg:w-[500px] bg-white shadow-xl">
                          {menu.items.map((item) => (
                            <li key={item}>
                              <Link
                                href="/products"
                                className="block text-sm text-gray-600 hover:text-indigo-600 hover:font-semibold p-2 rounded-md transition-colors duration-200"
                                onClick={() =>
                                  setCategories([item.toUpperCase()])
                                }
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Cart and Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActive(!active)}
                className="relative hover:bg-gray-100 transition-colors duration-200"
              >
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Carrito</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-600" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600" />
                )}
                <span className="sr-only">Menú</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden bg-white shadow-md">
            <div className="pt-2 pb-3 space-y-1">
              {[
                { href: "/", label: "Inicio" },
                { href: "/products", label: "Productos" },
                { href: "/offers", label: "Ofertas" },
                { href: "/contact", label: "Contacto" },
              ].map((item) => (
                <ActiveLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  activeClassName="text-indigo-600 bg-indigo-50"
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  {item.label}
                </ActiveLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    )
  );
};

export default Nav;
