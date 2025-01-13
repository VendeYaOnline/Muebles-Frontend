"use client";

import { useEffect, useState } from "react";
import classes from "./SelectId.module.css";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  value: string;
  placeholder: string;
  setValue: (value: string) => void;
  id: string;
  data: { id: number; name: string }[];
}

const SelectId = ({ data = [], value, id, setValue, placeholder }: Props) => {
  const [activeSelect, setActiveSelect] = useState(false);

  const onClose = (newValue: string) => {
    if (newValue === value) {
      setActiveSelect(false);
      setValue("");
    } else {
      setActiveSelect(false);
      setValue(newValue);
    }
  };

  const onChange = () => {
    setActiveSelect((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent, activeSelect: boolean) => {
    const elemento = document.getElementById(id);
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
    <div className={classes["container-select"]} id={id}>
      <div
        className={
          activeSelect ? classes["select-active"] : classes["select-disabled"]
        }
        onClick={onChange}
      >
        <span className="text-slate-400 ml-1 flex select-none justify-between items-center">
          {value !== "" ? value : placeholder}
          {activeSelect ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </div>
      {activeSelect && (
        <div className={classes.list}>
          {data.map((item) => (
            <span
              key={item.id}
              onClick={() => onClose(item.name)}
              className={
                item.name === value
                  ? `${classes.active} flex justify-between items-center`
                  : "flex justify-between items-center"
              }
            >
              {item.name}
              {item.name === value && <Check size={12} />}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectId;
