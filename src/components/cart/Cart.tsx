"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, PackageOpen, Plus, Trash, X } from "lucide-react";
import { useProducts } from "@/hooks";
import { calculateTotal, totalSum } from "@/utils";
import { useCart } from "@/app/dashboard/hooks";
import classes from "./Cart.module.css";

const Cart = () => {
  const { products, removeProduct, addProduct, deleteProduct } = useProducts();
  const { active, setActive } = useCart();
  const total = totalSum(products);
  return (
    <section
      className={classes["container-menu"]}
      style={{ right: active ? "0px" : "-400px" }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Tu carrito</h1>
        <X className="cursor-pointer" onClick={() => setActive(false)} />
      </div>
      <hr className="mt-5" />
      {products.length ? (
        <>
          <div className={classes["container-scrooll"]}>
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
                            <label className="text-sm text-gray-600">
                              Color:
                            </label>
                            <div
                              className="color"
                              style={{ backgroundColor: variant }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {product.discount_price ? (
                      <div className="flex flex-col text-sm">
                        <label className="font-bold">Precio</label>

                        <div className="flex items-center gap-2">
                          <span>{product.discount_price}</span>
                          <span className="line-through">{product.price}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col text-sm">
                        <label className="font-bold">Precio</label>
                        <span>{product.price}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h2>
                      Total:{" "}
                      {calculateTotal(
                        product.discount_price
                          ? product.discount_price
                          : product.price,
                        quantity
                      )}
                    </h2>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-20 bg-white w-full">
            <h1 className="text-xl mb-2">SUBTOTAL: {total}</h1>
            <Link href="/checkout">
              <button className="p-3 text-md w-[86%] box-content bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300">
                Ir al carrito y pagar
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="w-full h-full gap-3 flex justify-center items-center flex-col">
          <h1 className="text-xl">No tienes productos</h1>
          <PackageOpen size={70} strokeWidth={1.5} />
        </div>
      )}
    </section>
  );
};

export default Cart;
