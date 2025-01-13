"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import classes from "./SelectProducts.module.css";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ProductRequest, Products } from "../../interfaces";

interface Props {
  value?: Products;
  placeholder: string;
  setValue: Dispatch<SetStateAction<Products | undefined>>;
  data?: ProductRequest;
}

const SelectProducts = ({ data, value, setValue, placeholder }: Props) => {
  const [activeSelect, setActiveSelect] = useState(false);

  const onClose = (newValue: Products) => {
    if (newValue.title === value?.title) {
      setActiveSelect(false);
      setValue(undefined);
    } else {
      setActiveSelect(false);
      setValue(newValue);
    }
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
        <span className="text-slate-400 ml-1 flex justify-between items-center">
          {value ? (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 overflow-hidden">
                <img
                  src={value.image_product}
                  className="rounded-sm w-full h-full object-cover"
                />
              </div>
              <span>{value.title + " - " + value.price}</span>
            </div>
          ) : (
            placeholder
          )}
          {activeSelect ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </div>
      {activeSelect && (
        <div className={classes.list}>
          {data?.products.length && data.products.some(i => i.stock) ? (
            data.products.filter(i => i.stock).map((item) => (
              <span
                key={item.id}
                onClick={() => onClose(item)}
                className={
                  item.title === value?.title
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

                {item.title === value?.title && <Check size={12} />}
              </span>
            ))
          ) : (
            <span>No hay productos con stock</span>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectProducts;
