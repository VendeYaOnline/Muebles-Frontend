"use client";

import Image from "next/image";
import classes from "./product.module.css";
import { useEffect, useState } from "react";
import { useBundleSelection, useProduct, useProducts, useVariantSelection } from "@/hooks";
import { lineKey } from "@/hooks/useProducts";
import VariantSelector from "@/components/VariantSelector";
import BundleSelector from "@/components/BundleSelector";
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
  const variantSelection = useVariantSelection(product);
  const bundle = useBundleSelection(product);
  const choice = bundle.isBundle ? bundle.choice : variantSelection.choice;
  const canAdd = bundle.isBundle ? bundle.canAdd : variantSelection.canAdd;
  const effectiveColor = bundle.isBundle
    ? ""
    : variantSelection.hasVariants
      ? variantSelection.colorHex
      : selectColor;
  const currentLine = product ? lineKey(product.id, effectiveColor, choice?.variantKey) : "";

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
          className={`${classes["button-back"]} bg-blue-600 transition-all hover:bg-blue-500`}
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

          {bundle.isBundle && (
            <div className="mt-4">
              <BundleSelector product={product} bundle={bundle} />
              <p className={`mt-2 text-xs ${canAdd ? "text-gray-500" : "text-red-500"}`}>
                {canAdd
                  ? `Precio por set de ${bundle.size}`
                  : "Alguna pieza del set no tiene unidades: cambia su color o talla."}
              </p>
            </div>
          )}

          {!bundle.isBundle && variantSelection.hasVariants && (
            <div className="mt-4">
              <VariantSelector
                product={product}
                attributes={variantSelection.attributes}
                selection={variantSelection.selection}
                onChange={variantSelection.setValue}
              />
              <p className={`mt-2 text-xs ${variantSelection.canAdd ? "text-gray-500" : "text-red-500"}`}>
                {variantSelection.canAdd
                  ? `${variantSelection.available} disponibles`
                  : "Esta combinación está agotada"}
              </p>
            </div>
          )}

          {!bundle.isBundle && !variantSelection.hasVariants && product.attributes.Color.length > 0 && (
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
            (a) => lineKey(a.product.id, a.variant, a.variantKey) === currentLine
          ) ? (
            <button className="flex items-center justify-between mt-5 text-md w-full bg-blue-400 text-white py-3 px-4 rounded-md transition duration-300">
              Producto agregado
              <ShoppingCartIcon size={17} />
            </button>
          ) : (
            <button
              disabled={!canAdd}
              onClick={() => {
                addProduct(product, effectiveColor, choice);
                toast.success("Producto agregado");
              }}
              className="mt-5 text-md w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {canAdd ? "Agregar al carrito" : "Agotado"}
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
