"use client";

import Image from "next/image";
import classes from "./product.module.css";
import { Cant } from "@/components";
import { useEffect, useState } from "react";
import { useProduct } from "@/hooks";
import { Card } from "@/components/ui/card";
import { useQueryProduct } from "@/api/queries";
import { usePathname } from "next/navigation";

const DetailProduct = () => {
  const [value, setValue] = useState(1);
  const pathname = usePathname();
  const { product, setProduct } = useProduct();
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

  return isLoading ? (
    <Card className="text-center p-5 w-[60%] h-[500px] flex justify-center items-center m-auto mt-[170px] mb-[170px]">
      <div className="loader-3" />
    </Card>
  ) : product ? (
    <section className={classes["container-details"]}>
      <div className={classes["container-images"]}>
        <Image
          src={product.image_product}
          width={100}
          height={100}
          alt="Producto"
          className="rounded-xl cursor-pointer"
          priority
          onClick={() => setSelectedImage(product.image_product)}
        />
        {product.images.map((image, index) => (
          <Image
            key={index}
            src={image}
            width={100}
            height={100}
            alt="Producto"
            className="rounded-xl cursor-pointer"
            priority
            onClick={() => setSelectedImage(image)}
          />
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
              <div className={classes.color} />
              <div className={classes.color} />
              <div className={classes.color} />
            </div>
          </>
        )}

        <p className="mt-5">{product.description}</p>
        <Cant value={value} setValue={setValue} />
        <button className="text-md w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-300">
          Agregar al carrito
        </button>
      </div>
    </section>
  ) : (
    <Card className="text-center p-5 w-[60%] h-[500px] flex justify-center items-center m-auto mt-[170px] mb-[170px]">
      <h1 className="text-xl sm:text-3xl">
        El producto que estás buscando ya no está disponible.
      </h1>
    </Card>
  );
};

export default DetailProduct;
