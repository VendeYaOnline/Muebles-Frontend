"use client";

import { useEffect, useState, useMemo } from "react";
import {
  useQueryCategoriesStore,
  useQueryProductsByCategory,
} from "@/api/queries";
import {
  Search,
  Menu,
  Frown,
  Package,
  Check,
  ShoppingCartIcon,
  Eye,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Pagination } from "@/components";
import SkeletonCategories from "@/components/skeleton-categories/SkeletonCategories";
import Image from "next/image";
import toast from "react-hot-toast";

import { useCategory, useProduct, useProducts } from "@/hooks";
import { IProduct } from "@/interfaces";
import { useDebounce } from "@/hooks/useDebounce"; // nuevo hook debounce

import classes from "./products.module.css";
import ProductModal from "@/components/ProductModal";

function Products() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedSearch = useDebounce(search);
  const debouncedCategory = useDebounce(selectedCategories);

  const { setProduct, product: productCart } = useProduct();
  const { categories } = useCategory();
  const { addProduct, products } = useProducts();
  const { data: categoryData, isLoading: loadingCategories } =
    useQueryCategoriesStore();

  // Derivar los IDs desde los nombres guardados globalmente
  useEffect(() => {
    if (!categoryData?.categories) return;
    const matched = categoryData.categories
      .filter((cat) => categories.includes(cat.name))
      .map((cat) => cat.id);
    if (matched.length) setSelectedCategories(matched);
  }, [categories, categoryData]);

  const { data, isFetching, refetch } = useQueryProductsByCategory(
    currentPage,
    debouncedSearch,
    debouncedCategory
  );

  useEffect(() => {
    refetch();
  }, [debouncedSearch, debouncedCategory, currentPage]);

  const toggleCategory = (id: number) => {
    setCurrentPage(1);
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [id]
    );
  };

  const addCart = (product: IProduct) => {
    const color = product.attributes.Color?.[0]?.color || "";
    addProduct(product, color);
    toast.success("Producto agregado");
  };

  const Sidebar = useMemo(() => {
    return (
      <div className="space-y-6 bg-white">
        {loadingCategories && <SkeletonCategories />}
        {categoryData && categoryData?.categories?.length > 0 && (
          <nav className={`space-y-2 mt-3 ${classes["container-categories"]}`}>
            {categoryData.categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                variant="ghost"
                className={
                  selectedCategories.includes(category.id)
                    ? "w-[90%] justify-between text-teal-900 font-medium bg-gray-200"
                    : "w-[90%] justify-start text-teal-900 font-medium hover:bg-gray-200"
                }
              >
                {category.name}
                {selectedCategories.includes(category.id) && (
                  <Check color="gray" size={12} />
                )}
              </Button>
            ))}
          </nav>
        )}
      </div>
    );
  }, [categoryData, selectedCategories]);

  return (
    <div className="container mx-auto py-8 px-4 mb-10 mt-20 min-h-screen">
      {/* Mobile Menu */}
      <div className="lg:hidden mb-6">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Menu className="mr-2 h-4 w-4" /> Categorías
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="w-full bg-white pt-10">
            <SheetTitle className="sr-only">Categorías</SheetTitle>
            {Sidebar}
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-64 hidden lg:block sticky top-8 self-start">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-[10px] h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar"
              className="pl-9"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {Sidebar}
        </aside>

        {/* Product Grid */}
        <section className="flex-grow">
          {isFetching ? (
            <div className="w-full h-[600px] flex justify-center items-center bg-white">
              <div className={classes.loader} />
            </div>
          ) : data?.products.length ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.products.map((product) => (
                  <CardProduct
                    key={product.id}
                    product={product}
                    setProduct={setProduct}
                    addCart={addCart}
                    products={products}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                  />
                ))}
              </div>
              <div className={data.total < 5 ? "mt-[310px]" : "mt-24"}>
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={data.totalPages}
                  handleNextPage={() => setCurrentPage((p) => p + 1)}
                  handlePrevPage={() =>
                    setCurrentPage((p) => Math.max(1, p - 1))
                  }
                />
              </div>
            </>
          ) : (
            <Card className="p-5 h-[600px] flex justify-center items-center flex-col gap-3 mb-[350px] text-center">
              <Frown size={50} />
              <h1 className="text-xl">
                Lo sentimos, no encontramos ningún resultado
              </h1>
            </Card>
          )}
        </section>
      </div>

      {productCart && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={productCart}
          products={products}
        />
      )}
    </div>
  );
}

// Subcomponente para producto individual
function CardProduct({
  product,
  setProduct,
  addCart,
  products,
  setIsModalOpen,
}: any) {
  const isAdded = products.find((a: any) => a.product.id === product.id);

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden relative"
      onClick={() => setProduct(product)}
    >
      <div className="relative h-44" onClick={() => setIsModalOpen(true)}>
        <div className="w-full h-full absolute top-0 bottom-0 z-20 transition-all duration-700 hover:bg-[#d2d3d693] flex justify-center items-center cursor-pointer">
          <div className="relative group w-full h-full">
            <div className="w-full h-full absolute top-0 bottom-0 z-20 transition-all duration-700 group-hover:bg-[#d2d3d693] flex justify-center items-center cursor-pointer">
              <Eye
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                color="white"
              />
            </div>
          </div>
        </div>
        <Image
          src={product.image_product}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
          placeholder="empty"
          quality={75}
          priority={product.id === 1}
        />
      </div>
      {product.discount > 0 && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 m-2 rounded-md">
          {product.discount}% OFF
        </div>
      )}
      <div className="p-4">
        <h5 className="text-lg font-semibold mb-2 text-gray-800 h-14 line-clamp-2">
          {product.title}
        </h5>
        <div className="flex items-center mb-2">
          <Package className="w-5 h-5 text-gray-500 mr-2" />
          <span className="text-sm text-green-500">En stock</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          {product.discount_price ? (
            <>
              <span className="text-lg font-bold text-gray-800">
                {product.discount_price}
              </span>
              <span className="text-sm text-gray-500 line-through ml-2">
                {product.price}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-800">
              {product.price}
            </span>
          )}
        </div>
        {isAdded ? (
          <button className="flex justify-between items-center text-sm w-full bg-blue-400 text-white py-2 px-4 rounded-md">
            Producto agregado
            <ShoppingCartIcon size={17} />
          </button>
        ) : (
          <button
            className="text-sm w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              addCart(product);
            }}
          >
            Agregar al carrito
          </button>
        )}
      </div>
    </div>
  );
}

export default Products;
