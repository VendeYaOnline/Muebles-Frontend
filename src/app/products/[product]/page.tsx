"use client";

import Image from "next/image";
import classes from "./product.module.css";
import { useEffect, useState } from "react";
import { useProduct, useProducts } from "@/hooks";
import { Card } from "@/components/ui/card";
import { useQueryProduct } from "@/api/queries";
import { usePathname } from "next/navigation";
import { ArrowLeftFromLine, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const DetailProduct = () => {
  const pathname = usePathname();
  const { product, setProduct } = useProduct();
  const [selectColor, setSelectColor] = useState("");
  const { addProduct, products } = useProducts();
  const { data, isLoading } = useQueryProduct(
    product ? undefined : Number(pathname.split("-").pop())
  );
  const [selectedImage, setSelectedImage] = useState<string>(
    product?.image_product || ""
  );

  useEffect(() => {
    if (data) {
      setProduct(data);
      setSelectedImage(data.image_product);
    }
  }, [data]);

  useEffect(() => {
    if (product) {
      setSelectColor(
        product.attributes.Color.length ? product.attributes.Color[0].color : ""
      );
    }
  }, [product]);

  return isLoading ? (
    <Card className="text-center p-5 w-[60%] h-[500px] flex justify-center items-center m-auto mt-[250px] mb-[170px]">
      <div className="loader-3" />
    </Card>
  ) : product ? (
    <div className={classes["container-menu"]}>
      <Link href="/products">
        <button
          className={`${classes["button-back"]} bg-indigo-600 transition-all hover:bg-indigo-500`}
        >
          <ArrowLeftFromLine size={17} />
        </button>
      </Link>

      <section className={classes["container-details"]}>
        <div className={classes["container-images"]}>
          <div className="skeleton-loader-image-product-details">
            <Image
              src={product.image_product}
              width={100}
              height={100}
              alt="Producto"
              className="rounded-xl cursor-pointer"
              priority
              onClick={() => setSelectedImage(product.image_product)}
            />
          </div>

          {product.images.map((image, index) => (
            <div className="skeleton-loader-image-product-details" key={index}>
              <Image
                src={image}
                width={70}
                height={70}
                alt="Producto"
                style={{ width: "100%" }}
                className="rounded-xl cursor-pointer"
                priority
                onClick={() => setSelectedImage(image)}
              />
            </div>
          ))}
        </div>
        <Image
          src={selectedImage}
          width={650}
          height={400}
          alt="image-product"
          priority
          className={classes["image-product"]}
        />

        <div className={classes["container-info"]}>
          <h1>{product.title}</h1>
          <span>{product.reference}</span>
          <h2 className="text-xl">{product.price}</h2>

          {product.attributes.Color.length > 0 && (
            <>
              <h3>Colores</h3>
              <div className={classes["container-colors"]}>
                {product.attributes.Color.map(({ color }, index) => (
                  <div
                    key={index}
                    className={classes.color}
                    onClick={() => setSelectColor(color)}
                    style={{
                      backgroundColor: color,
                      borderWidth: color === selectColor ? 2 : 0,
                    }}
                  />
                ))}
              </div>
            </>
          )}

          <p className="mt-5">{product.description}</p>
          {/* <Cant value={value} setValue={setValue} /> */}

          {products.find(
            (a) => a.product.id === product.id && a.variant === selectColor
          ) ? (
            <button className="flex items-center justify-between mt-5 text-md w-full bg-indigo-400 text-white py-3 px-4 rounded-md transition duration-300">
              Producto agregado
              <ShoppingCartIcon size={17} />
            </button>
          ) : (
            <button
              onClick={() => {
                addProduct(product, selectColor);
                toast.success("Producto agregado");
              }}
              className="mt-5 text-md w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Agregar al carrito
            </button>
          )}
        </div>
      </section>
    </div>
  ) : (
    <Card className="text-center p-5 w-[60%] h-[500px] flex justify-center items-center m-auto mt-[170px] mb-[170px]">
      <h1 className="text-xl sm:text-3xl">
        El producto que estás buscando ya no está disponible.
      </h1>
    </Card>
  );
};

export default DetailProduct;
