import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Shield, Truck } from "lucide-react";
import Modal from "./Modal";
import Image from "next/image";
import { IProduct } from "@/interfaces";
import { useProducts } from "@/hooks";
import { ProductWithQuantity } from "@/hooks/useProducts";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: IProduct;
  products: ProductWithQuantity[];
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  product,
  products,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = [product.image_product, ...product.images];
  const { addProduct } = useProducts();
  const isAdded = products.find((a) => a.product.id === product.id);
  const selectFirtsColor = product.attributes.Color[0].color;

  const [variant, setVariant] = useState(selectFirtsColor);
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        {/* Galería de imágenes */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
            {allImages[currentImageIndex] ? (
              <Image
                src={allImages[currentImageIndex]}
                alt={product.title}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Cargando imagen...
              </div>
            )}

            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-200"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-200"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === currentImageIndex
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.Categories.map((category) => (
                <span
                  key={category.id}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {category.name}
                </span>
              ))}
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <p className="text-gray-600 mb-4">
              Referencia: {product.reference}
            </p>
          </div>
          {/* Precio */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-green-600">
              {product.price}
            </span>
            {product.discount_price && (
              <span className="text-xl text-gray-500 line-through">
                {product.discount_price}
              </span>
            )}
          </div>
          {/* Características principales */}
          <div className="flex items-center gap-6 py-4 border-y border-gray-200">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500" size={20} />
              <span className="text-sm text-gray-600">Con garantía</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="text-blue-500" size={20} />
              <span className="text-sm text-gray-600">Calidad premium</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="text-green-500" size={20} />
              <span className="text-sm text-gray-600">Envío rápido</span>
            </div>
          </div>
          {/* Descripción */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Descripción</h3>
            <div className="text-gray-700 leading-relaxed space-y-2">
              {product.description.split("\r\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
          {/* Atributos */}
          {product.attributes.Color.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Especificaciones</h3>
              <div className="space-y-3">
                <span className="font-medium text-gray-900">Color:</span>
                <div className="flex gap-2 flex-wrap">
                  {product.attributes.Color.map((item, index) => {
                    return (
                      <div key={index} className="flex">
                        <span
                          key={index}
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                            variant === item.color
                              ? "border border-gray-500"
                              : "bg-gray-100 cursor-pointer border border-gray-100"
                          }`}
                          onClick={() => setVariant(item.color)}
                        >
                          {item.color && (
                            <div
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: item.color }}
                            />
                          )}
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Botones de acción */}

          <div className="flex gap-3 pt-6">
            {isAdded ? (
              <button className="flex-1 bg-blue-400 text-white py-3 px-6 rounded-xl font-semibold">
                Producto agregado
              </button>
            ) : (
              <button
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
                onClick={() => addProduct(product, variant)}
              >
                Agregar al carrito
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
