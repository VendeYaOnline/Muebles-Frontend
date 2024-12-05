import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      {/* Barra de navegación */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-gray-800">MEM</span>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Inicio
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Productos
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Ofertas
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Contacto
              </a>
            </div>
            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
                <span className="sr-only">Buscar</span>
              </Button>
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
        <div className="sm:hidden">
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
  );
};

export default NavBar;
