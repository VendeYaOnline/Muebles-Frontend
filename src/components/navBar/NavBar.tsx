"use client";

import { Menu, ShoppingCart, X } from "lucide-react";
import { Button } from "../ui/button";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import ActiveLink from "../active-link/ActiveLink";
import { useProducts } from "@/hooks";
import { useCart } from "@/app/dashboard/hooks";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { products } = useProducts();
  const pathname = usePathname();
  const { active, setActive } = useCart();

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
