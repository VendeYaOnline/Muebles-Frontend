import { useQueryFeatured } from "@/api/queries";
import Image from "next/image";
import { Package } from "lucide-react";

const FeaturedProducts = () => {
  const { data, isLoading } = useQueryFeatured(1, "");
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-16">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Productos destacados
      </h2>
      {isLoading ? (
        <div className="loader" />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data ? (
              data.products.map(({ product, id }) => (
                <div
                  key={id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative h-40">
                    <Image
                      src={product.image_product}
                      alt={product.title}
                      layout="fill"
                      objectFit="cover"
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md">
                        {product.discount}% OFF
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2 text-gray-800 h-14">
                      {product.title.length > 27
                        ? product.title.slice(0, 27)
                        : product.title}
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
                      {/*        <div className="flex items-center">
                      <ShoppingCart className="w-5 h-5 text-gray-500 mr-1" />
                      <span className="text-sm text-gray-500">{product.quantity} disponibles</span>
                    </div> */}
                    </div>
                    {/*      <p className="text-sm text-gray-600 mb-4">
                      {product.description}
                    </p> */}
                    <button className=" text-sm w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300">
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h2>Sin productos destacados</h2>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedProducts;
