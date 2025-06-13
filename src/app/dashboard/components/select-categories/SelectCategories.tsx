"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import classes from "./SelectCategories.module.css";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  CircleX,
} from "lucide-react";
import { useQueryCategories } from "../../api/queries";

interface Props {
  label?: string;
  categories: { id: number; name: string }[];
  setCategories: Dispatch<
    SetStateAction<
      {
        id: number;
        name: string;
      }[]
    >
  >;
}

const SelectCategories = ({ label, categories, setCategories }: Props) => {
  const [activeSelect, setActiveSelect] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isFetching } = useQueryCategories(currentPage, "");

  const onClose = (newValue: { id: number; name: string }) => {
    if (!categories.find((i) => i.name === newValue.name)) {
      setCategories((prev) => [...prev, newValue]);
      setActiveSelect(false);
    } else {
      const result = categories.filter((i) => i.name !== newValue.name);
      setCategories(result);
      setActiveSelect(false);
    }
  };

  const removeCategory = (name: string) => {
    const result = categories.filter((i) => i.name !== name);
    setCategories(result);
  };

  const handleNextPage = () => {
    if (currentPage < (data?.totalPages || 1)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onChange = () => {
    setActiveSelect((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent, activeSelect: boolean) => {
    const elemento = document.getElementById("select-category");
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
    <div className={classes["container-select"]} id="select-category">
      {data && data.totalPages > 1 && (
        <nav className="flex items-center gap-1 mt-2">
          <button
            className="p-1 rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <ArrowLeft size={13} />
          </button>

          {data && data.totalPages > 1 && (
            <nav className="flex items-center space-x-2">
              {Array.from({ length: data?.totalPages || 0 }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-5 h-5 rounded-md text-xs font-medium ${
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

          <button
            className="p-1 rounded-md text-sm font-sm text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none"
            onClick={handleNextPage}
            disabled={currentPage === data.totalPages}
          >
            <ArrowRight size={13} />
          </button>
        </nav>
      )}

      <label className="my-1 block text-slate-600">
        {label || "Categorias"}
      </label>
      <div
        className={
          activeSelect ? classes["select-active"] : classes["select-disabled"]
        }
        onClick={onChange}
      >
        <span className="text-slate-400 ml-1 flex select-none justify-between items-center">
          {isFetching ? (
            <div className="m-[4.5px]">
              <div className="loader-mini" />
            </div>
          ) : (
            "Selecionar categorias"
          )}
          {activeSelect ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </div>
      {activeSelect && (
        <div className={classes.list}>
          {data?.categories.map((category) => (
            <span
              key={category.id}
              onClick={() => onClose(category)}
              className={
                categories.find((i) => i.name === category.name)
                  ? `${classes.active} flex justify-between items-center`
                  : "flex justify-between items-center"
              }
            >
              {category.name}
              {categories.find((i) => i.name === category.name) && (
                <Check size={12} />
              )}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-2">
        {categories.map((category) => (
          <div className="burble" key={category.id}>
            {category.name}
            <CircleX
              size={14}
              className="cursor-pointer"
              onClick={() => removeCategory(category.name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCategories;
