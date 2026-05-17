"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useQueryCategoriesStore, useQueryProductsByCategory } from "@/api/queries";
import {
  Search, SlidersHorizontal, Frown, CheckCircle2, ShoppingBag,
  Eye, Tag, X, LayoutGrid, List, ChevronDown, ArrowUpDown,
  Sparkles, Package,
} from "lucide-react";
import { Pagination } from "@/components";
import SkeletonCategories from "@/components/skeleton-categories/SkeletonCategories";
import Image from "next/image";
import toast from "react-hot-toast";
import { useCategory, useProduct, useProducts } from "@/hooks";
import { IProduct } from "@/interfaces";
import { useDebounce } from "@/hooks/useDebounce";
import ProductModal from "@/components/ProductModal";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
type ViewMode = "grid" | "list";

/* ─── Sidebar ─────────────────────────────────────────────────────────────── */
function Sidebar({
  search, setSearch, setCurrentPage,
  categoryData, loadingCategories,
  selectedCategories, toggleCategory, clearFilters,
}: any) {
  return (
    <div className="flex flex-col gap-5">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray pointer-events-none" />
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          placeholder="Buscar..."
          className="w-full bg-cream border border-warm-border rounded-xl py-2.5 pl-9 pr-9 text-sm text-charcoal placeholder:text-warm-gray focus:outline-none focus:ring-1 focus:ring-gold/40 focus:border-gold transition-all"
        />
        {search && (
          <button onClick={() => { setSearch(""); setCurrentPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="w-3.5 h-3.5 text-warm-gray hover:text-charcoal transition-colors" />
          </button>
        )}
      </div>

      {/* Separator */}
      <div className="h-px bg-warm-border" />

      {/* Category header */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-gold tracking-[0.18em] uppercase" style={{ fontFamily: "var(--font-semibold)" }}>
          Categorías
        </span>
        {selectedCategories.length > 0 && (
          <button
            onClick={clearFilters}
            className="text-[10px] text-warm-gray hover:text-charcoal transition-colors flex items-center gap-1"
          >
            <X className="w-2.5 h-2.5" /> Limpiar
          </button>
        )}
      </div>

      {/* "All products" button */}
      <button
        onClick={clearFilters}
        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-200 flex items-center gap-2 ${
          selectedCategories.length === 0
            ? "bg-charcoal text-white"
            : "text-warm-gray hover:bg-cream hover:text-charcoal"
        }`}
      >
        <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
        Todos los productos
      </button>

      {/* Category list */}
      {loadingCategories && <SkeletonCategories />}
      {(categoryData?.categories?.length ?? 0) > 0 && (
        <nav className="flex flex-col gap-0.5 max-h-[58vh] overflow-y-auto pr-0.5">
          {categoryData!.categories.map((cat: any) => {
            const isSelected = selectedCategories.includes(cat.id);
            return (
              <motion.button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.12 }}
                className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-xl text-sm transition-all duration-150 ${
                  isSelected
                    ? "bg-gold/12 text-gold border border-gold/25 font-medium"
                    : "text-warm-gray hover:bg-cream hover:text-charcoal border border-transparent"
                }`}
              >
                <span className="truncate">{cat.name}</span>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0 ml-1" />}
              </motion.button>
            );
          })}
        </nav>
      )}
    </div>
  );
}

/* ─── Grid Card ───────────────────────────────────────────────────────────── */
function GridCard({ product, index, setProduct, addCart, products, setIsModalOpen }: any) {
  const isAdded = products.find((a: any) => a.product.id === product.id);

  const handleOpen = useCallback(() => {
    setProduct(product);
    setIsModalOpen(true);
  }, [product, setProduct, setIsModalOpen]);

  return (
    <motion.div
      custom={index}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.45, ease }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl border border-warm-border overflow-hidden hover:border-gold/30 hover:shadow-xl hover:shadow-charcoal/5 transition-all duration-350 cursor-pointer flex flex-col"
    >
      {/* Image area */}
      <div className="relative bg-cream overflow-hidden" style={{ aspectRatio: "1/1" }} onClick={handleOpen}>
        {/* Discount badge */}
        {product.discount > 0 && (
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 bg-charcoal text-white text-[10px] tracking-wide px-2.5 py-1 rounded-full">
            <Tag className="w-2.5 h-2.5" />
            {product.discount}% OFF
          </div>
        )}

        <Image
          src={product.image_product}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          quality={75}
          priority={index < 4}
        />

        {/* Quick-view hover layer */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300" />
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3">
          <div className="flex gap-2">
            <button
              onClick={handleOpen}
              className="flex-1 flex items-center justify-center gap-1.5 bg-white/95 backdrop-blur-sm text-charcoal text-xs py-2 rounded-xl hover:bg-white transition-colors shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" /> Vista rápida
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        {/* Category */}
        {product.Categories?.length > 0 && (
          <span className="text-[10px] tracking-[0.1em] text-gold uppercase" style={{ fontFamily: "var(--font-semibold)" }}>
            {product.Categories[0].name}
          </span>
        )}

        <h5 className="text-sm text-charcoal leading-snug line-clamp-2 flex-1" style={{ fontFamily: "var(--font-semibold)" }}>
          {product.title}
        </h5>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-base text-charcoal" style={{ fontFamily: "var(--font-bold)" }}>
            {product.discount_price || product.price}
          </span>
          {product.discount_price && (
            <span className="text-xs text-warm-gray line-through">{product.price}</span>
          )}
        </div>

        {/* CTA */}
        {isAdded ? (
          <div className="flex items-center justify-center gap-1.5 bg-gold/8 text-gold border border-gold/20 text-xs py-2.5 rounded-xl">
            <ShoppingBag className="w-3.5 h-3.5" /> En tu carrito
          </div>
        ) : (
          <motion.button
            whileHover={{ backgroundColor: "#c9a86a" }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => { e.stopPropagation(); addCart(product); }}
            className="w-full bg-gold text-white text-xs tracking-wide py-2.5 rounded-xl transition-colors duration-200"
          >
            Agregar al carrito
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

/* ─── List Card ───────────────────────────────────────────────────────────── */
function ListCard({ product, index, setProduct, addCart, products, setIsModalOpen }: any) {
  const isAdded = products.find((a: any) => a.product.id === product.id);

  const handleOpen = useCallback(() => {
    setProduct(product);
    setIsModalOpen(true);
  }, [product, setProduct, setIsModalOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.35), duration: 0.4, ease }}
      className="group bg-white rounded-2xl border border-warm-border overflow-hidden hover:border-gold/30 hover:shadow-lg hover:shadow-charcoal/5 transition-all duration-300 flex cursor-pointer"
    >
      {/* Image */}
      <div
        className="relative w-36 sm:w-48 flex-shrink-0 bg-cream overflow-hidden"
        onClick={handleOpen}
      >
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-charcoal text-white text-[9px] px-2 py-0.5 rounded-full">
            <Tag className="w-2 h-2" /> {product.discount}%
          </div>
        )}
        <Image
          src={product.image_product}
          alt={product.title}
          fill
          sizes="192px"
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          quality={75}
        />
      </div>

      {/* Info */}
      <div className="flex-1 p-3 sm:p-5 flex flex-col gap-2 min-w-0">
        {product.Categories?.length > 0 && (
          <span className="text-[10px] tracking-[0.1em] text-gold uppercase" style={{ fontFamily: "var(--font-semibold)" }}>
            {product.Categories[0].name}
          </span>
        )}

        <h5 className="text-sm sm:text-base text-charcoal leading-snug line-clamp-2" style={{ fontFamily: "var(--font-semibold)" }}>
          {product.title}
        </h5>

        <div className="flex items-center gap-1.5 text-xs text-warm-gray">
          <Package className="w-3 h-3" strokeWidth={1.5} />
          En stock
        </div>

        {product.description && (
          <p className="text-xs text-warm-gray leading-relaxed line-clamp-2 hidden sm:block">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span className="text-base sm:text-lg text-charcoal" style={{ fontFamily: "var(--font-bold)" }}>
            {product.discount_price || product.price}
          </span>
          {product.discount_price && (
            <span className="text-xs text-warm-gray line-through">{product.price}</span>
          )}
        </div>

        {/* Actions — stacked on mobile, inline on sm+ */}
        <div className="flex gap-2 pt-1">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="hidden sm:flex items-center gap-1.5 border border-warm-border text-warm-gray hover:text-charcoal hover:border-charcoal/30 text-xs px-3 py-2 rounded-xl transition-all flex-shrink-0"
          >
            <Eye className="w-3.5 h-3.5" /> Ver
          </motion.button>

          {isAdded ? (
            <div className="flex flex-1 items-center justify-center gap-1.5 bg-gold/8 text-gold border border-gold/20 text-xs px-3 py-2 rounded-xl">
              <ShoppingBag className="w-3.5 h-3.5" /> En carrito
            </div>
          ) : (
            <motion.button
              whileHover={{ backgroundColor: "#c9a86a" }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.stopPropagation(); addCart(product); }}
              className="flex flex-1 items-center justify-center gap-1.5 bg-gold text-white text-xs px-3 py-2 rounded-xl transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Agregar al carrito</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main page ───────────────────────────────────────────────────────────── */
export default function Products() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const debouncedSearch = useDebounce(search);
  const debouncedCategory = useDebounce(selectedCategories);

  const { setProduct, product: productCart } = useProduct();
  const { categories } = useCategory();
  const { addProduct, products } = useProducts();
  const { data: categoryData, isLoading: loadingCategories } = useQueryCategoriesStore();
  const { data, isFetching, refetch } = useQueryProductsByCategory(currentPage, debouncedSearch, debouncedCategory);

  useEffect(() => {
    if (!categoryData?.categories) return;
    const matched = categoryData.categories.filter((c) => categories.includes(c.name)).map((c) => c.id);
    if (matched.length) setSelectedCategories(matched);
  }, [categories, categoryData]);

  useEffect(() => { refetch(); }, [debouncedSearch, debouncedCategory, currentPage]);

  const toggleCategory = (id: number) => {
    setCurrentPage(1);
    setSelectedCategories((prev) => prev.includes(id) ? prev.filter((cid) => cid !== id) : [id]);
  };

  const clearFilters = () => { setSelectedCategories([]); setSearch(""); setCurrentPage(1); };

  const addCart = (product: IProduct) => {
    addProduct(product, product.attributes.Color?.[0]?.color || "");
    toast.custom(
      (t) => (
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : 6, scale: t.visible ? 1 : 0.96 }}
          transition={{ duration: 0.22 }}
          className="flex items-center gap-3 bg-ivory border border-warm-border rounded-2xl px-4 py-3 max-w-[320px] w-full"
          style={{ boxShadow: "0 8px 32px rgba(26,23,20,0.08)" }}
        >
          {product.image_product && (
            <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 border border-warm-border bg-cream">
              <img src={product.image_product} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-gold mb-0.5" style={{ fontFamily: "var(--font-semibold)" }}>Añadido al carrito</p>
            <p className="text-sm text-charcoal truncate" style={{ fontFamily: "var(--font-semibold)" }}>{product.title}</p>
          </div>
          <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-4 h-4 text-gold" strokeWidth={1.5} />
          </div>
        </motion.div>
      ),
      { duration: 3000, position: "bottom-right" }
    );
  };

  const sidebarProps = { search, setSearch, setCurrentPage, categoryData, loadingCategories, selectedCategories, toggleCategory, clearFilters };

  // Active filter chips from category names
  const activeChips = useMemo(() =>
    (categoryData?.categories ?? []).filter((c) => selectedCategories.includes(c.id)),
    [categoryData, selectedCategories]
  );

  return (
    <div className="min-h-screen bg-cream">
      {/* ── Page header ── */}
      <div className="bg-ivory border-b border-warm-border">
        <div className="max-w-screen-xl mx-auto px-5 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col gap-1.5">
            <div className="gold-line" />
            <h1 className="text-3xl text-charcoal" style={{ fontFamily: "var(--font-bold)" }}>Catálogo</h1>
            <p className="text-sm text-warm-gray">
              {data ? `${data.grandTotal ?? data.products.length} productos` : "Explorando nuestra colección…"}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-5 lg:px-8 py-6">
        <div className="flex gap-6">

          {/* ── Sidebar desktop ── */}
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="w-60 xl:w-64 hidden lg:flex flex-col gap-0 sticky top-22 self-start"
            style={{ top: "88px" }}
          >
            <div className="bg-white border border-warm-border rounded-2xl p-5 shadow-sm">
              <Sidebar {...sidebarProps} />
            </div>
          </motion.aside>

          {/* ── Right column ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">

            {/* Controls bar */}
            <div className="flex flex-col gap-3">
              {/* Mobile search + filter */}
              <div className="lg:hidden flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray" />
                  <input
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                    placeholder="Buscar productos..."
                    className="w-full bg-white border border-warm-border rounded-xl py-2.5 pl-9 pr-4 text-sm text-charcoal placeholder:text-warm-gray focus:outline-none focus:ring-1 focus:ring-gold/40 focus:border-gold"
                  />
                </div>
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="relative flex items-center gap-2 bg-white border border-warm-border rounded-xl px-4 py-2.5 text-sm text-charcoal hover:border-gold/40 transition-colors flex-shrink-0"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {selectedCategories.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-gold text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                      {selectedCategories.length}
                    </span>
                  )}
                </button>

                {/* Custom animated filter drawer */}
                <AnimatePresence>
                  {isMenuOpen && (
                    <>
                      {/* Backdrop */}
                      <motion.div
                        key="filter-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 bg-charcoal/40 backdrop-blur-sm"
                        onClick={() => setIsMenuOpen(false)}
                      />

                      {/* Drawer panel */}
                      <motion.div
                        key="filter-drawer"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 320, damping: 32 }}
                        className="fixed top-0 left-0 z-50 h-full w-72 bg-ivory border-r border-warm-border flex flex-col shadow-2xl"
                      >
                        {/* Drawer header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-warm-border flex-shrink-0">
                          <div className="flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4 text-gold" />
                            <span className="text-sm text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>Filtros</span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="w-7 h-7 rounded-full bg-cream border border-warm-border flex items-center justify-center hover:border-charcoal/20 transition-colors"
                          >
                            <X className="w-3.5 h-3.5 text-warm-gray" />
                          </motion.button>
                        </div>

                        {/* Sidebar content */}
                        <div className="flex-1 overflow-y-auto p-5">
                          <Sidebar {...sidebarProps} />
                        </div>

                        {/* Footer apply button */}
                        {selectedCategories.length > 0 && (
                          <div className="p-4 border-t border-warm-border flex-shrink-0">
                            <motion.button
                              whileHover={{ backgroundColor: "#c9a86a" }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => setIsMenuOpen(false)}
                              className="w-full bg-gold text-white text-sm py-3 rounded-xl transition-colors"
                            >
                              Ver resultados
                            </motion.button>
                          </div>
                        )}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Top bar: active chips + view toggle */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Active filter chips */}
                <AnimatePresence>
                  {activeChips.map((cat) => (
                    <motion.button
                      key={cat.id}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => toggleCategory(cat.id)}
                      className="flex items-center gap-1.5 bg-gold/10 border border-gold/25 text-gold rounded-full px-3 py-1 text-xs hover:bg-gold/20 transition-colors"
                    >
                      {cat.name}
                      <X className="w-3 h-3" />
                    </motion.button>
                  ))}
                  {activeChips.length > 1 && (
                    <motion.button
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onClick={clearFilters}
                      className="text-xs text-warm-gray hover:text-charcoal transition-colors px-2 py-1 underline underline-offset-2"
                    >
                      Limpiar todo
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Spacer */}
                <div className="flex-1" />

                {/* View mode toggle */}
                <div className="flex items-center gap-1 bg-white border border-warm-border rounded-xl p-1">
                  {(["grid", "list"] as ViewMode[]).map((mode) => (
                    <motion.button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2 rounded-lg transition-all duration-200 ${viewMode === mode ? "bg-charcoal text-white shadow-sm" : "text-warm-gray hover:text-charcoal"}`}
                    >
                      {mode === "grid" ? <LayoutGrid className="w-3.5 h-3.5" /> : <List className="w-3.5 h-3.5" />}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Product area ── */}
            <AnimatePresence mode="wait">
              {isFetching ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className={viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "flex flex-col gap-3"
                  }
                >
                  {Array.from({ length: viewMode === "grid" ? 8 : 5 }).map((_, i) => (
                    <div key={i} className={`rounded-2xl overflow-hidden bg-white border border-warm-border ${viewMode === "list" ? "flex h-36" : ""}`}>
                      <div className={`skeleton-loader-image-product ${viewMode === "list" ? "w-36 h-full flex-shrink-0" : "aspect-square w-full"}`} />
                      {viewMode === "list" && (
                        <div className="flex-1 p-5 flex flex-col gap-2 justify-center">
                          <div className="skeleton-loader-image-product h-3 rounded w-1/4" />
                          <div className="skeleton-loader-image-product h-4 rounded w-3/4" />
                          <div className="skeleton-loader-image-product h-4 rounded w-1/2" />
                        </div>
                      )}
                      {viewMode === "grid" && (
                        <div className="p-4 flex flex-col gap-2">
                          <div className="skeleton-loader-image-product h-3 rounded w-1/3" />
                          <div className="skeleton-loader-image-product h-4 rounded w-5/6" />
                          <div className="skeleton-loader-image-product h-9 rounded-xl mt-1" />
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              ) : data?.products.length ? (
                <motion.div key={`grid-${viewMode}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className={viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "flex flex-col gap-3"
                  }>
                    {data.products.map((product, i) =>
                      viewMode === "grid" ? (
                        <GridCard
                          key={product.id} product={product} index={i}
                          setProduct={setProduct} addCart={addCart}
                          products={products} setIsModalOpen={setIsModalOpen}
                        />
                      ) : (
                        <ListCard
                          key={product.id} product={product} index={i}
                          setProduct={setProduct} addCart={addCart}
                          products={products} setIsModalOpen={setIsModalOpen}
                        />
                      )
                    )}
                  </div>
                  <div className="mt-10">
                    <Pagination
                      currentPage={currentPage} setCurrentPage={setCurrentPage}
                      totalPages={data.totalPages}
                      handleNextPage={() => setCurrentPage((p) => p + 1)}
                      handlePrevPage={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center gap-5 py-28 bg-white border border-warm-border rounded-2xl text-center px-6"
                >
                  <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center">
                    <Frown className="w-7 h-7 text-warm-gray" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base text-charcoal mb-1" style={{ fontFamily: "var(--font-semibold)" }}>Sin resultados</h3>
                    <p className="text-sm text-warm-gray">No hay productos con los filtros seleccionados.</p>
                  </div>
                  <button onClick={clearFilters} className="text-sm text-gold border border-gold/30 rounded-full px-5 py-2 hover:bg-gold/5 transition-colors">
                    Limpiar filtros
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {productCart && (
        <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={productCart} products={products} />
      )}
    </div>
  );
}
