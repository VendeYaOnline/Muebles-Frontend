"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import ShoppingCartComponent from "../ShoppingCart";
import { useCategory, useProducts } from "@/hooks";
import { totalSum } from "@/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { products, addProduct, removeProduct, deleteProduct } = useProducts();
  const total = totalSum(products);
  const { setCategories } = useCategory();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (title: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(title);
  };
  console.log("pathname", pathname);
  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleItemClick = (item: string) => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setCategories([item.toUpperCase()]);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    pathname !== "/17312678/admin" && (
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold text-blue-800">MEM</h1>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((menu) => (
                <div
                  key={menu.title}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(menu.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded-md transition-colors duration-200"
                    aria-expanded={activeDropdown === menu.title}
                  >
                    <span>{menu.title}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === menu.title ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {activeDropdown === menu.title && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-200">
                      {menu.items.map((item, index) => (
                        <Link href="/products" key={index}>
                          <button
                            onClick={() => handleItemClick(item)}
                            className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 text-sm"
                          >
                            {item}
                          </button>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Shopping Cart and Mobile menu button */}
            <div className="flex items-center space-x-2">
              <ShoppingCartComponent
                items={products}
                addQuantity={addProduct}
                removeQuantity={removeProduct}
                onRemoveItem={deleteProduct}
                total={total}
              />

              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white animate-in slide-in-from-top-5 duration-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {menuItems.map((menu) => (
                  <div key={menu.title} className="space-y-1">
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === menu.title ? null : menu.title
                        )
                      }
                      className="w-full flex items-center justify-between text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors duration-200"
                    >
                      <span>{menu.title}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === menu.title ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {activeDropdown === menu.title && (
                      <div className="ml-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                        {menu.items.map((item, index) => (
                          <Link href="/products" key={index}>
                            <button
                              onClick={() => handleItemClick(item)}
                              className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 text-sm"
                            >
                              {item}
                            </button>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    )
  );
};

export default Navbar;
