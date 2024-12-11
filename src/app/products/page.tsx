"use client";

import { ChangeEvent, useRef, useState } from "react";
import { useQueryProducts } from "@/api/queries";
import { Search, Menu, Frown, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import classes from "./products.module.css";
import { Pagination } from "@/components";

function Products() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const firstLoad = useRef(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const { data, isFetching, refetch } = useQueryProducts(currentPage, search);

  const categories = [
    "Todos",
    "Televisores",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
  ];

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

  const handleChange = (value: string) => {
    setSearch(value);
    firstLoad.current = true;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      refetch();
    }, 500);
  };

  const Sidebar = () => (
    <div className="space-y-6 bg-white">
      <nav className="space-y-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant="ghost"
            className="w-full justify-start text-teal-900 font-medium hover:bg-gray-200"
          >
            {category}
          </Button>
        ))}
      </nav>

      <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
        Todas las categorias
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4">
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
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
          <Sidebar />
        </div>

        {/* Product Grid */}
        {isFetching ? (
          <div className="w-full h-[950px] flex justify-center items-center bg-white">
            <div className={classes.loader} />
          </div>
        ) : (
          <div className="flex-grow">
            {data?.products.length ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
                {data.products.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="skeleton-loader-image-product">
                      <div className="aspect-square relative">
                        <img
                          src={product.image_product}
                          alt="Product image"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">{product.title}</h3>
                      <p className="text-lg mb-3">{product.price}</p>
                      <Button className="w-full justify-between bg-black hover:bg-[#2A3335] text-white">
                        Agregar al carrito
                        <ShoppingCart size={50} />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-5 h-[600px] flex justify-center items-center flex-col gap-3 mb-[350px]">
                <Frown size={50} />
                <h1 className="text-xl">Sin productos</h1>
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
