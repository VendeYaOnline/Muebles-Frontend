"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import classes from "./SelectGender.module.css";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Attribute } from "@/app/dashboard/interfaces";

interface Props {
  value: string[];
  data: { id: number; gender: string }[];
  setValue: Dispatch<SetStateAction<string[]>>;
  setValueAttribute: Dispatch<SetStateAction<Attribute>>;
}

const SelectGender = ({ data, value, setValue, setValueAttribute }: Props) => {
  const [activeSelect, setActiveSelect] = useState(false);

  const onClose = useCallback(
    (newValue: { id: number; gender: string }) => {
      if (!value.some((i) => i === newValue.gender)) {
        setValue((prev) => [...prev, newValue.gender]);
        setValueAttribute((prev) => ({
          ...prev,
          gender: [...prev.gender, newValue.gender],
        }));
      } else {
        const removeGenders = value.filter((item) => item !== newValue.gender);
        setValue(removeGenders);
        setValueAttribute((prev) => ({ ...prev, gender: removeGenders }));
      }
      setActiveSelect(false);
    },
    [value]
  );

  const onChange = () => {
    setActiveSelect((prev) => !prev);
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent, activeSelect: boolean) => {
      const elemento = document.getElementById("select-gender");
      if (elemento && !elemento.contains(event.target as Node)) {
        if (activeSelect) {
          setActiveSelect(false);
        }
      }
    },
    []
  );

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
    <div className={classes["container-select"]} id="select-gender">
      <>
        <div
          className={
            activeSelect ? classes["select-active"] : classes["select-disabled"]
          }
          onClick={onChange}
        >
          <span className="text-slate-400 ml-1 flex justify-between items-center">
            <span>Seleciona un género</span>
            {activeSelect ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </span>
        </div>

        {activeSelect && (
          <div className={classes.list}>
            {data.map((item, index) => (
              <span
                key={index}
                onClick={() => onClose(item)}
                className={
                  value.some((i) => i === item.gender)
                    ? `${classes.active} flex justify-between items-center`
                    : "flex justify-between items-center"
                }
              >
                {item.gender}
                {value.some((i) => i === item.gender) && <Check size={12} />}
              </span>
            ))}
          </div>
        )}
      </>
    </div>
  );
};

export default SelectGender;
