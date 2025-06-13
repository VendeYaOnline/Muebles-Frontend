"use client";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./SelectSearchProducts.module.css";
import { Check, X } from "lucide-react";
import { ProductSale } from "../../interfaces";
import { useQueryProductsSearch } from "../../api/queries";
import Image from "next/image";

interface Props {
  value?: ProductSale;
  products: ProductSale[];
  setValue: Dispatch<SetStateAction<ProductSale | undefined>>;
}

const SelectSearchProducts = ({ value, setValue, products }: Props) => {
  const [activeSelect, setActiveSelect] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const firstLoad = useRef(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const { data, refetch, isFetching } = useQueryProductsSearch(
    currentPage,
    searchInput
  );

  const onClose = (newValue: ProductSale) => {
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

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 30) {
      setSearchInput(e.target.value);
      firstLoad.current = true;

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        setActiveSelect(false);
        refetch();
      }, 500);
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

  useEffect(() => {
    if (!isFetching && searchInput !== "") {
      setActiveSelect(true);
    }
  }, [isFetching, searchInput]);

  return (
    <div className="flex flex-col gap-1">
      {data && data.totalPages > 1 && (
        <nav className="flex items-center space-x-2 absolute bottom-[62px] left-24">
          {Array.from({ length: data?.totalPages || 0 }, (_, index) => (
            <button
              key={index}
              type="button"
              className={`w-4 h-4 rounded-md text-xs ${
                currentPage === index + 1
                  ? "text-white bg-blue-600"
                  : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </nav>
      )}

      <div className={classes["container-select"]} id="select">
        {value ? (
          <div className={classes["select-disabled"]}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 overflow-hidden">
                  <Image
                    alt={value.title}
                    src={value.image_product}
                    width={20}
                    height={20}
                    className="rounded-sm w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm w-32 truncate whitespace-nowrap overflow-hidden cursor-pointer">
                  {value.title}
                </span>
              </div>

              <X
                size={17}
                color="#686D76"
                className="cursor-pointer"
                onClick={() => setValue(undefined)}
              />
            </div>
          </div>
        ) : (
          <input
            value={searchInput}
            onChange={onChangeSearch}
            placeholder={"Buscar productos"}
            className={
              activeSelect
                ? classes["select-active"]
                : classes["select-disabled"]
            }
            onClick={onChange}
          />
        )}

        {activeSelect && (
          <div className={classes.list}>
            {data?.products.length && data.products.some((i) => i.stock) ? (
              data.products
                .filter((i) => i.stock)
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() =>
                      onClose({
                        id: item.id,
                        image_product: item.image_product,
                        quantity: item.quantity,
                        title: item.title,
                        price: item.price,
                        discount_price: item.discount_price,
                        discount: item.discount,
                        images: item.images,
                        purchase_total: "",
                      })
                    }
                  >
                    <div
                      className={`flex items-center gap-2 w-full px-2 ${
                        products.find((i) => i.title === item.title)
                          ? "bg-gray-200"
                          : null
                      }`}
                    >
                      <div className="skeleton-loader-image-product">
                        <div className="w-7 h-7 overflow-hidden">
                          <Image
                            alt={item.title}
                            src={item.image_product}
                            width={20}
                            height={20}
                            className="rounded-sm w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <span className="text-sm w-full truncate whitespace-nowrap overflow-hidden cursor-pointer">
                        {item.title}
                      </span>
                    </div>

                    {item.title === value?.title && <Check size={12} />}
                  </div>
                ))
            ) : (
              <span>No hay productos</span>
            )}
          </div>
        )}
        <div className="mt-1 relative mb-3">
          {isFetching && <div className="loader-mini absolute" />}
        </div>
      </div>
    </div>
  );
};

export default SelectSearchProducts;
