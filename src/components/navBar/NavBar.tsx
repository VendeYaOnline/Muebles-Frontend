"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import ShoppingCartComponent from "../ShoppingCart";
import { useCategory, useProducts } from "@/hooks";
import { totalSum } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.15 } },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
};

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { products, addProduct, removeProduct, deleteProduct } = useProducts();
  const total = totalSum(products);
  const { setCategories } = useCategory();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (title: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(title);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 180);
  };

  const handleItemClick = (item: string) => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setCategories([item.toUpperCase()]);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  if (pathname === "/17312678/admin") return null;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] as [
          number,
          number,
          number,
          number,
        ],
      }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-warm-border"
          : "bg-white border-b border-warm-border"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-[70px]">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <div className="flex flex-col leading-none">
              <span
                className="text-2xl tracking-widest text-charcoal group-hover:text-gold transition-colors duration-300"
                style={{ fontFamily: "var(--font-bold)" }}
              >
                MEM
              </span>
              <span className="text-[9px] tracking-[0.25em] text-warm-gray uppercase">
                Muebles & Hogar
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((menu) => (
              <div
                key={menu.title}
                className="relative"
                onMouseEnter={() => handleMouseEnter(menu.title)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="group flex items-center gap-1 text-charcoal hover:text-gold py-2 px-4 text-sm tracking-wide transition-colors duration-200 relative"
                  aria-expanded={activeDropdown === menu.title}
                >
                  <span>{menu.title}</span>
                  <motion.div
                    animate={{
                      rotate: activeDropdown === menu.title ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-3.5 h-3.5 text-warm-gray" />
                  </motion.div>
                  {/* underline */}
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>

                <AnimatePresence>
                  {activeDropdown === menu.title && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-0 mt-2 w-52 bg-white border border-warm-border rounded-xl shadow-xl py-2 z-50 origin-top-left"
                    >
                      {menu.items.map((item, index) => (
                        <Link href="/products" key={index}>
                          <motion.button
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.04 }}
                            onClick={() => handleItemClick(item)}
                            className="w-full text-left px-5 py-2.5 text-sm text-warm-gray hover:text-gold hover:bg-cream transition-all duration-150"
                          >
                            {item}
                          </motion.button>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <Link
              href="/products"
              className="ml-2 text-sm text-warm-gray hover:text-gold transition-colors duration-200 px-4 py-2 relative group"
            >
              <span>Catálogo</span>
              <span className="absolute bottom-0 left-4 right-4 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
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
                className="p-2 rounded-lg text-charcoal hover:text-gold hover:bg-cream transition-all duration-200"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="x"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden overflow-hidden border-t border-warm-border"
            >
              <div className="py-4 space-y-1">
                {menuItems.map((menu, menuIndex) => (
                  <motion.div
                    key={menu.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: menuIndex * 0.06 }}
                    className="space-y-1"
                  >
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === menu.title ? null : menu.title,
                        )
                      }
                      className="w-full flex items-center justify-between text-left px-4 py-3 text-charcoal hover:text-gold hover:bg-cream rounded-lg text-sm font-medium transition-all duration-200"
                    >
                      <span>{menu.title}</span>
                      <motion.div
                        animate={{
                          rotate: activeDropdown === menu.title ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-warm-gray" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {activeDropdown === menu.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 overflow-hidden"
                        >
                          {menu.items.map((item, index) => (
                            <Link href="/products" key={index}>
                              <button
                                onClick={() => handleItemClick(item)}
                                className="w-full text-left px-4 py-2.5 text-sm text-warm-gray hover:text-gold transition-colors duration-150"
                              >
                                {item}
                              </button>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="px-4 pt-2"
                >
                  <Link
                    href="/products"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm text-warm-gray hover:text-gold py-2 transition-colors"
                  >
                    Ver catálogo completo →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
