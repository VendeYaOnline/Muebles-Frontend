import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import classes from "./AttributeColor.module.css";
import { CircleX } from "lucide-react";
import { getContrastingColor } from "@/app/dashboard/functions";
import { Attribute } from "@/app/dashboard/interfaces";
import Input from "../../input/Input";

interface Props {
  nameAttribute: string;
  attributes: Attribute;
  setisValid: Dispatch<SetStateAction<boolean>>;
  setValueAttribute: Dispatch<SetStateAction<Attribute>>;
}

const AttributeColor = ({
  nameAttribute,
  attributes,
  setValueAttribute,
  setisValid,
}: Props) => {
  const [name, setname] = useState("");
  const [error, setError] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#1A1A19");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 30) {
      setname(e.target.value);
    }
  };

  const addColor = () => {
    if (
      attributes.color.length < 10 &&
      !attributes.color.find((i) => i.name === name)
    ) {
      setValueAttribute({
        ...attributes,
        color: [...attributes.color, { name: name, color: selectedColor }],
      });
      setname("");
      setSelectedColor("#1A1A19");
      setError(false);
    } else {
      setError(true);
    }
  };

  const removeColor = (name: string) => {
    const newColors = attributes.color.filter((i) => i.name !== name);
    setValueAttribute({ ...attributes, color: newColors });
  };

  useEffect(() => {
    if (nameAttribute !== "" && attributes.color.length) {
      setisValid(true);
    } else {
      setisValid(false);
    }
  }, [nameAttribute, attributes.color]);

  return (
    <>
      <div>
        <div className="flex flex-col">
          <label className="text-slate-600 mb-2">Nombre del color</label>
          <div className="flex justify-between items-center gap-4">
            <Input
              value={name}
              onChange={onChange}
              placeholder="Rojo, Azul, Negro..."
            />

            <input
              type="color"
              value={selectedColor}
              className={classes["select-color"]}
              onChange={(e) => setSelectedColor(e.target.value)}
            />
          </div>
        </div>
      </div>
      {error && (
        <span className="text-xs text-red-700">El color ya existe</span>
      )}

      {attributes.color.length === 10 && (
        <span className="text-xs text-gray-600">
          Ha alcanzado el límite máximo de valores (10)
        </span>
      )}
      <div className="flex flex-wrap gap-2">
        {attributes.color.map((item, index) => (
          <div
            key={index}
            className="rounded-lg py-1 px-2 text-sm flex items-center gap-2"
            style={{
              backgroundColor: item.color,
              color: getContrastingColor(item.color),
            }}
          >
            {item.name}{" "}
            <CircleX
              size={14}
              className="cursor-pointer"
              onClick={() => removeColor(item.name)}
            />
          </div>
        ))}
      </div>

      <div>
        <button
          type="button"
          onClick={addColor}
          className={
            name !== "" && attributes.color.length < 10
              ? classes["add-color-active"]
              : classes["add-color"]
          }
          disabled={
            (name !== "" ? false : true) || attributes.color.length === 10
          }
        >
          Agregar color
        </button>
      </div>
    </>
  );
};

export default AttributeColor;
