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

interface Props {
  value?: ProductSale;
  setValue: Dispatch<SetStateAction<ProductSale | undefined>>;
}

const SelectSearchProducts = ({ value, setValue }: Props) => {
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
                  ? "text-white bg-indigo-600"
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
                  <img
                    src={value.image_product}
                    className="rounded-sm w-full h-full object-cover"
                  />
                </div>
                <span>
                  {value.title.length > 13
                    ? value.title.slice(0, 13) + ".."
                    : value.title}
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
                  <span
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
                    className={
                      item.title === value?.title
                        ? `${classes.active} flex justify-between items-center`
                        : "flex justify-between items-center"
                    }
                  >
                    <div className="flex items-center gap-2">
                      <div className="skeleton-loader-image-product">
                        <div className="w-7 h-7 overflow-hidden">
                          <img
                            src={item.image_product}
                            className="rounded-sm w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {item.title.length > 13
                        ? item.title.slice(0, 13) + ".."
                        : item.title}
                    </div>

                    {item.title === value?.title && <Check size={12} />}
                  </span>
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
