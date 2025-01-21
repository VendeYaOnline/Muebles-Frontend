"use client";

import { useCategory } from "@/hooks";
import { featured } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Category = () => {
  const { setCategories } = useCategory();
  const navigator = useRouter();

  const navigationCategory = (category: string) => {
    setCategories([category]);
    navigator.push("/products");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <h2 className="text-2xl font-semibold text-gray-800 md:text-left lg:text-left xl:text-left text-center mb-6">
        Categorías destacadas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((category, index) => (
          <div
            key={index}
            onClick={() => navigationCategory(category.name)}
            className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <Image
              src={category.img}
              alt={category.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold select-none">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
