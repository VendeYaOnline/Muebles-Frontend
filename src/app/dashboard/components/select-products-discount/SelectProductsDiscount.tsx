"use client";

import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Check, ChevronDown, ChevronUp, CircleX } from "lucide-react";
import { ProductRequest, Products } from "../../interfaces";
import classes from "../StylesSelect.module.css";
import toast from "react-hot-toast";

interface Props {
  value: Products[];
  isFetching: boolean;
  placeholder: string;
  products: Products[];
  setProducts: Dispatch<SetStateAction<Products[]>>;
  data?: ProductRequest;
  setValue: Dispatch<SetStateAction<Products[]>>;
  selectedItem:
    | MutableRefObject<
        | {
            id: number;
            name: string;
            products: Products[];
          }
        | undefined
      >
    | undefined;
}

const SelectProductsDiscount = ({
  data,
  value,
  setValue,
  isFetching,
  products,
  setProducts,
  placeholder,
  selectedItem,
}: Props) => {
  const [activeSelect, setActiveSelect] = useState(false);

  useEffect(() => {
    if (selectedItem?.current?.products.length || data?.products?.length) {
      const combinedProducts = [
        ...(selectedItem?.current?.products || []),
        ...(data?.products || []),
      ];
      // Filtrar duplicados si los productos tienen un ID único
      const uniqueProducts = combinedProducts.filter(
        (item, index, self) => index === self.findIndex((p) => p.id === item.id)
      );
      setProducts(uniqueProducts);
    } else {
      setProducts([]); // Vaciar si no hay datos en ninguno de los dos
    }
  }, [data, selectedItem?.current, setProducts]);

  const onClose = (newValue: Products) => {
    if (SelectProductsDiscount.length <= 8) {
      const findProduct = value?.find((i) => i.title === newValue.title);
      const removeProduct = value?.filter((i) => i.title !== newValue.title);
      if (findProduct) {
        setActiveSelect(false);
        setValue(removeProduct);
      } else {
        setActiveSelect(false);
        setValue((prev) => [...prev, newValue]);
      }
    } else {
      toast.error("Máximo superado");
    }
  };

  const removeProduct = (product: Products) => {
    const result = value.filter((i) => i.title !== product.title);
    /*   const findResult = products?.concat(product);
    setProducts(findResult); */
    setValue(result);
  };

  const onChange = () => {
    setActiveSelect((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent, activeSelect: boolean) => {
    const elemento = document.getElementById("select");
    if (elemento && !elemento.contains(event.target as Node)) {
      if (activeSelect) {
        setActiveSelect(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", (e) =>
      handleClickOutside(e, activeSelect)
    );
    return () => {
      document.removeEventListener("click", (e) =>
        handleClickOutside(e, activeSelect)
      );
    };
  }, [activeSelect]);

  return (
    <div className={classes["container-select"]} id="select">
      <div
        className={
          activeSelect ? classes["select-active"] : classes["select-disabled"]
        }
        onClick={onChange}
      >
        <span className="text-slate-400 select-none ml-1 flex justify-between items-center">
          {isFetching ? (
            <div className="m-[4.5px]">
              <div className="loader-mini" />
            </div>
          ) : (
            placeholder
          )}
          {activeSelect ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </div>
      {activeSelect && (
        <div className={classes.list}>
          {products?.length && products.some((i) => i.stock) ? (
            products
              .filter((i) => i.stock)
              .map((item) => (
                <span
                  key={item.id}
                  onClick={() => onClose(item)}
                  className={
                    value?.find((i) => i.title === item.title)
                      ? `${classes.active} flex justify-between items-center`
                      : "flex justify-between items-center"
                  }
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 overflow-hidden">
                      <img
                        src={item.image_product}
                        className="rounded-sm w-full h-full object-cover"
                      />
                    </div>
                    {item.title}
                  </div>

                  {value?.find((i) => i.title === item.title) && (
                    <Check size={12} />
                  )}
                </span>
              ))
          ) : (
            <span>No hay productos</span>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((product) => (
          <div className="burble" key={product.id}>
            {product.title}
            <CircleX
              size={14}
              className="cursor-pointer"
              onClick={() => removeProduct(product)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectProductsDiscount;
