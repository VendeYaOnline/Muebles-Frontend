import { useQueryProducts } from "@/api/queries";
import Image from "next/image";
import { Button } from "../ui/button";

const FeaturedProducts = () => {
  const { data, isLoading } = useQueryProducts(1, "");
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
              data.products.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-52 w-full flex justify-center overflow-hidden">
                    <Image
                      priority
                      src={product.image_product}
                      alt={product.title}
                      width={200}
                      height={200}
                      style={{
                        objectFit: "cover",
                        margin: "auto",
                        borderRadius: 10,
                      }}
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mt-1">{product.price}</p>
                    <Button className="w-full mt-4" variant="outline">
                      Añadir al carrito
                    </Button>
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
