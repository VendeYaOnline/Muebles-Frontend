"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import classes from "./SelectAttribute.module.css";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import {
  AttributeValues,
  TpeValue,
  ValuesAttributes,
} from "@/app/dashboard/interfaces";

interface Value {
  valueString: string;
  valueObject: string;
}

interface ValueObject {
  name: string;
  color: string;
}

interface Props {
  value: Value;
  selectedType: TpeValue;
  setValue: Dispatch<SetStateAction<Value>>;
  attributeValue: AttributeValues;
  setValuesAttributes: Dispatch<SetStateAction<ValuesAttributes>>;
  valuesAttributes: ValuesAttributes;
  placeholder: string;
}

const SelectAttribute = ({
  selectedType,
  value,
  setValue,
  attributeValue,
  placeholder,
  valuesAttributes,
  setValuesAttributes,
}: Props) => {
  const [activeSelect, setActiveSelect] = useState(false);

  const onCloseString = useCallback(
    (newValue: string) => {
      if (
        selectedType === "Color"
          ? !valuesAttributes["Color"].some((i) => i.name === newValue)
          : !valuesAttributes[selectedType].some((i: string) => i === newValue)
      ) {
        setActiveSelect(false);
        setValue({ valueObject: "", valueString: newValue });
        setValuesAttributes({
          ...valuesAttributes,
          [selectedType]: [...valuesAttributes[selectedType], newValue],
        });
      } else {
        setActiveSelect(false);
        setValue({ valueObject: "", valueString: "" });
        const valueRemove = valuesAttributes[selectedType].filter(
          (i) => i !== newValue
        );
        setValuesAttributes({
          ...valuesAttributes,
          [selectedType]: valueRemove,
        });
      }
    },
    [valuesAttributes, selectedType]
  );
  const onCloseObject = useCallback(
    (newValue: ValueObject) => {
      setActiveSelect(false);
      if (!valuesAttributes.Color.some((i) => i.name === newValue.name)) {
        setValue({ valueString: "", valueObject: newValue.name });
        setValuesAttributes({
          ...valuesAttributes,
          Color: [...valuesAttributes.Color, newValue],
        });
      } else {
        setValue({ valueString: "", valueObject: "" });
        const valueRemove = valuesAttributes.Color.filter(
          (i) => i.name !== newValue.name
        );
        setValuesAttributes({
          ...valuesAttributes,
          Color: valueRemove,
        });
      }
    },
    [valuesAttributes]
  );

  const onChange = () => {
    setActiveSelect((prev) => !prev);
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent, activeSelect: boolean) => {
      const elemento = document.getElementById("select-attribute");
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
    <div className={classes["container-select"]} id="select-attribute">
      {attributeValue.every((elemento) => typeof elemento === "string") ? (
        <>
          <div
            className={
              activeSelect
                ? classes["select-active"]
                : classes["select-disabled"]
            }
            onClick={onChange}
          >
            <span className="text-slate-400 ml-1 flex justify-between items-center">
              {value.valueString !== "" ? value.valueString : placeholder}
              {activeSelect ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </span>
          </div>
          {activeSelect && (
            <div className={classes.list}>
              {attributeValue.map((item, index) => (
                <span
                  key={index}
                  onClick={() => onCloseString(item as string)}
                  className={
                    valuesAttributes[selectedType].some((i) => i === item)
                      ? `${classes.active} flex justify-between items-center`
                      : "flex justify-between items-center"
                  }
                >
                  {item as string}
                  {valuesAttributes[selectedType].some((i) => i === item) && (
                    <Check size={12} />
                  )}
                </span>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div
            className={
              activeSelect
                ? classes["select-active"]
                : classes["select-disabled"]
            }
            onClick={onChange}
          >
            <span className="text-slate-400 ml-1 flex justify-between items-center">
              {value.valueObject !== "" ? value.valueObject : placeholder}
              {activeSelect ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </span>
          </div>
          {activeSelect && (
            <div className={classes.list}>
              {attributeValue.map((item: any, index) => (
                <span
                  key={index}
                  onClick={() => onCloseObject(item as ValueObject)}
                  className={
                    valuesAttributes[selectedType].some(
                      (i: any) => i.name === item.name
                    )
                      ? `${classes.active} flex justify-between items-center`
                      : "flex justify-between items-center"
                  }
                >
                  {item.name}
                  {valuesAttributes[selectedType].some(
                    (i: any) => i.name === item.name
                  ) && <Check size={12} />}
                </span>
              ))}
            </div>
          )}
        </>
      )}

      {/*       <div className="max-h-[200px] overflow-auto mt-2">
        <h1>Valores de {selectedType}</h1>
        <div className="flex flex-wrap gap-2 mt-2">
          {valuesAttributes[selectedType].map((item, index) => {
            if (typeof item === "object") {
              return (
                <div
                  className="rounded-lg py-1 px-3 text-sm"
                  key={index}
                  style={{
                    backgroundColor: item.color,
                    color: getContrastingColor(item.color),
                  }}
                >
                  {item.name}
                </div>
              );
            } else {
              return (
                <div key={index} className="burble">
                  {item}
                </div>
              );
            }
          })}
        </div>
      </div> */}
    </div>
  );
};

export default SelectAttribute;
