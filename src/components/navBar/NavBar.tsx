"use client";

import { Menu, ShoppingCart, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { usePathname } from "next/navigation";
import ActiveLink from "../active-link/ActiveLink";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  return (
    pathname !== "/17312678/admin" && (
      <div>
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center bg-indigo-600 w-[80px] h-[40px] rounded-full justify-center">
                  <span className="text-lg font-bold text-white">MEM</span>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
                <ActiveLink
                  href="/"
                  activeClassName="text-indigo-600"
                  className="text-gray-500"
                >
                  Inicio
                </ActiveLink>

                <ActiveLink
                  href="/products"
                  activeClassName="text-indigo-600"
                  className="text-gray-500"
                >
                  Productos
                </ActiveLink>

                <ActiveLink
                  href="/offers"
                  activeClassName="text-indigo-600"
                  className="text-gray-500"
                >
                  Ofertas
                </ActiveLink>

                <ActiveLink
                  href="/contact"
                  activeClassName="text-indigo-600"
                  className="text-gray-500"
                >
                  Contacto
                </ActiveLink>
              </div>
              <div className="hidden sm:flex sm:items-center sm:space-x-4">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Carrito</span>
                </Button>
              </div>
              <div className="flex items-center sm:hidden">
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
          <div className="sm:hidden absolute z-30 bg-white w-full border-t-2">
            <div className="pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Inicio
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Productos
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Ofertas
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Contacto
              </a>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default NavBar;
