"use client";

import { useEffect, useRef, useState } from "react";
import {
  useQueryCategoriesStore,
  useQueryProductsByCategory,
} from "@/api/queries";
import { Search, Menu, Frown, Package, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import classes from "./products.module.css";
import { Pagination } from "@/components";
import SkeletonCategories from "@/components/skeleton-categories/SkeletonCategories";
import Image from "next/image";
import { useCategory, useProduct } from "@/hooks";
import Link from "next/link";

function Products() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const { setProduct } = useProduct();
  const { categories, setCategories } = useCategory();
  const [categoryId, setCategoryId] = useState<number[]>([]);
  const { data: dataCategories, isLoading: isLoadingCategories } =
    useQueryCategoriesStore();
  const firstLoad = useRef(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const { data, isFetching, refetch } = useQueryProductsByCategory(
    currentPage,
    search,
    categoryId
  );
  useEffect(() => {
    if (categories.length && dataCategories?.categories.length) {
      const category = dataCategories.categories
        .filter((i) => categories.includes(i.name))
        .map((b) => b.id);

      if (category.length) {
        setCategoryId(category);
        setTimeout(() => {
          refetch();
        }, 500);
      }
    }
  }, [categories, dataCategories]);

  useEffect(() => {
    return () => {
      setCategories([]); // Limpia categorías al desmontar
      setCategoryId([]); // Reinicia ID de categoría
      refetch();
    };
  }, []);

  const handleNextPage = () => {
    if (currentPage < (data?.totalPages || 1)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleChangeSearch = (value: string) => {
    setSearch(value);
    firstLoad.current = true;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      refetch();
    }, 500);
  };

  const handleChangeCategory = (value: number) => {
    if (categoryId.includes(value)) {
      const result = categoryId.filter((i) => i !== value);
      setCategoryId(result);
      firstLoad.current = true;

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        refetch();
      }, 500);
    } else {
      setCategoryId([value]);
      firstLoad.current = true;

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        refetch();
      }, 500);
    }
  };

  const Sidebar = () => (
    <div className="space-y-6 bg-white">
      {isLoadingCategories && <SkeletonCategories />}

      {dataCategories?.categories && dataCategories.categories.length && (
        <nav className="space-y-2 mt-3">
          {dataCategories.categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => handleChangeCategory(category.id)}
              variant="ghost"
              className={
                categoryId.includes(category.id)
                  ? "w-full justify-between text-teal-900 font-medium bg-gray-200"
                  : "w-full justify-start text-teal-900 font-medium hover:bg-gray-200"
              }
            >
              {category.name}
              {categoryId.includes(category.id) && (
                <Check color="gray" size={12} />
              )}
            </Button>
          ))}
        </nav>
      )}
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4 mb-10">
      <div className="lg:hidden mb-6">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Menu className="mr-2 h-4 w-4" /> Categories
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="w-full bg-white pt-10">
            <SheetTitle className="sr-only">Categorias</SheetTitle>
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar - Hidden on small screens, visible on large screens */}
        <div className="w-64 flex-shrink-0 hidden lg:block sticky top-8 self-start">
          <div className="relative">
            <Search
              color="gray"
              className="absolute left-3 top-[10px] h-4 w-4 text-muted-foreground"
            />
            <Input
              placeholder="Search"
              className="pl-9"
              onChange={(e) => handleChangeSearch(e.target.value)}
            />
          </div>
          <Sidebar />
        </div>

        {/* Product Grid */}
        {isFetching ? (
          <div className="w-full h-[600px] flex justify-center items-center bg-white">
            <div className={classes.loader} />
          </div>
        ) : (
          <div className="flex-grow">
            {data?.products.length ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
                {data.products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => setProduct(product)}
                    className="bg-white rounded-lg shadow-md overflow-hidden relative"
                  >
                    <Link
                      href={`/products/${product.title.toLowerCase()}-${
                        product.id
                      }`}
                    >
                      <div className="relative h-44">
                        <Image
                          src={product.image_product}
                          alt={product.title}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          fill // Reemplaza layout="fill" (usa el nuevo atributo fill)
                          className="object-contain" // Usa Tailwind para manejar object-fit
                          placeholder="blur" // Activa el placeholder
                          blurDataURL="data:image/svg+xml;base64,<BASE_64_STRING>" // Opcional
                          quality={75} // Ajusta la calidad
                          priority={product.id === 1} // Carga imágenes prioritarias
                        />
                      </div>
                    </Link>

                    {product.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 m-2 rounded-md">
                        {product.discount}% OFF
                      </div>
                    )}
                    <div className="p-4">
                      <h2 className="text-lg font-semibold mb-2 text-gray-800 h-14 overflow-hidden text-ellipsis line-clamp-2">
                        {product.title}
                      </h2>
                      <div className="flex items-center mb-2">
                        <Package className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="text-sm text-green-500">En stock</span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
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
                      </div>
                      <button className="text-sm w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300">
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Card className="p-5 h-[600px] flex justify-center items-center flex-col gap-3 mb-[350px]">
                <Frown size={50} />
                <h1 className="text-xl">
                  Lo sentimos, no encontramos ningún resultado
                </h1>
              </Card>
            )}

            {data && data?.products.length > 0 && (
              <div className={data.total < 5 ? "mt-[310px]" : "mt-24"}>
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={data?.totalPages}
                  handleNextPage={handleNextPage}
                  handlePrevPage={handlePrevPage}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
