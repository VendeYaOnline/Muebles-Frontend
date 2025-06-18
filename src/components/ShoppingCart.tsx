import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import { ProductWithQuantity } from "@/hooks/useProducts";
import { IProduct } from "@/interfaces";
import { calculateTotal } from "@/utils";
import Link from "next/link";

interface ShoppingCartProps {
  items: ProductWithQuantity[];
  addQuantity: (product: IProduct, variant: string) => void;
  removeQuantity: (id: number, variant: string) => void;
  onRemoveItem: (productId: number, variant: string) => void;
  total: string;
}

const ShoppingCartComponent = ({
  items,
  addQuantity,
  removeQuantity,
  onRemoveItem,
  total,
}: ShoppingCartProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="relative" ref={cartRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
      >
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute top-1 left-6 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Carrito de Compras
            </h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {items.map((item, index) => (
              <div
                key={index}
                className="p-4 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.product.image_product}
                    alt={item.product.title}
                    className="w-12 h-12 object-cover rounded-md"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item.product.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {item.product.price}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        removeQuantity(item.product.id, item.variant)
                      }
                      className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>

                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => addQuantity(item.product, item.variant)}
                      className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id, item.variant)}
                    className="ml-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {item.variant ? (
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-sm flex items-center gap-2">
                      Color:
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.variant }}
                      />
                    </div>

                    <span className="text-sm font-semibold text-gray-900">
                      {calculateTotal(
                        item.product.discount_price
                          ? item.product.discount_price
                          : item.product.price,
                        item.quantity
                      )}
                    </span>
                  </div>
                ) : (
                  <div className="mt-2 text-right">
                    <span className="text-sm font-semibold text-gray-900">
                      {calculateTotal(
                        item.product.discount_price
                          ? item.product.discount_price
                          : item.product.price,
                        item.quantity
                      )}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-semibold text-gray-900">
                Total:
              </span>
              <span className="text-lg font-bold text-blue-700">{total}</span>
            </div>

            <Link href="/checkout" onClick={() => setIsOpen(false)}>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium">
                Proceder al Pago
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartComponent;
