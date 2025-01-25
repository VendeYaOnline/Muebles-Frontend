"use client";

import { Minus, Plus, Trash, X } from "lucide-react";
import classes from "./MenuProducts.module.css";
import { useProducts } from "@/hooks";
import Image from "next/image";
import Link from "next/link";
import { calculateTotal } from "@/utils";

const MenuProducts = () => {
  const { products, removeProduct, addProduct, deleteProduct } = useProducts();
  return (
    <section className={classes["container-menu"]}>
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Tu carrito</h1>
        <X />
      </div>
      <hr className="mt-5" />
      <div className="mt-2">
        {products.map(({ product, quantity, variant }, index) => (
          <div key={index} className="mt-2">
            <div className="flex justify-between items-center">
              <h2 className="text-sm text-gray-400">{product.title}</h2>
              <button
                onClick={() => deleteProduct(product.id, variant)}
                className="bg-gray-200 text-gray-600 rounded-lg p-2 hover:bg-gray-300 transition"
              >
                <Trash size={15} />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Link
                  href={`/products/${product.title.toLowerCase()}-${
                    product.id
                  }`}
                >
                  <Image
                    alt={product.title}
                    src={product.image_product}
                    width={100}
                    height={100}
                  />
                </Link>
                <div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => removeProduct(product.id, variant)}
                      className="rounded-full w-5 h-5 border border-gray-700 flex justify-center items-center"
                    >
                      <Minus size={13} />
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => addProduct(product, variant)}
                      className="rounded-full w-5 h-5 border border-gray-700 flex justify-center items-center"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  {variant !== "" && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Color:</span>
                      <div
                        className={classes.color}
                        style={{ backgroundColor: variant }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col text-sm">
                <span className="font-bold">Total</span>
                <span>{calculateTotal(product.price, quantity)}</span>
              </div>
            </div>

            <hr />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuProducts;
