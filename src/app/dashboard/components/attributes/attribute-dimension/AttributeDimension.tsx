import { Attribute } from "@/app/dashboard/interfaces";
import classes from "./AttributeDimension.module.css";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Input from "../../input/Input";
import { CirclePlus, CircleX } from "lucide-react";

interface Props {
  attributes: Attribute;
  setValueAttribute: Dispatch<SetStateAction<Attribute>>;
  nameAttribute: string;
  setisValid: Dispatch<SetStateAction<boolean>>;
}

const AttributeDimension = ({
  attributes,
  setValueAttribute,
  nameAttribute,
  setisValid,
}: Props) => {
  const [valueDimension, setValueDimension] = useState("");
  const [error, setError] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Z0-9\s-]+$/;
    if (
      (e.target.value.length < 15 && regex.test(e.target.value)) ||
      e.target.value === ""
    ) {
      setValueDimension(e.target.value.toLocaleUpperCase());
    }
  };

  const addDimension = () => {
    if (!attributes.dimension.find((i) => i === valueDimension)) {
      setValueAttribute({
        ...attributes,
        dimension: [...attributes.dimension, valueDimension],
      });
      setError(false);
      setValueDimension("");
    } else {
      setError(true);
    }
  };

  const removeDimension = (name: string) => {
    const newDimensions = attributes.dimension.filter((i) => i !== name);
    setValueAttribute({ ...attributes, dimension: newDimensions });
  };

  useEffect(() => {
    if (nameAttribute !== "" && attributes.dimension.length) {
      setisValid(true);
    } else {
      setisValid(false);
    }
  }, [nameAttribute, attributes.dimension]);

  return (
    <div>
      <label className="text-slate-600 block mb-2">Valor</label>
      <div className="flex gap-2">
        <Input
          value={valueDimension}
          onChange={onChange}
          placeholder="5MM, 10CM - ALTO, 15M - ANCHO"
        />
        <button
          type="button"
          className={
            valueDimension !== "" && attributes.dimension.length < 10
              ? classes["add-dimension-active"]
              : classes["add-dimension"]
          }
          onClick={addDimension}
          disabled={
            (valueDimension !== "" ? false : true) ||
            attributes.dimension.length === 10
          }
        >
          <CirclePlus />
        </button>
      </div>
      {error && (
        <span className="text-xs text-red-700">La dimensión ya existe</span>
      )}
      {attributes.dimension.length === 10 && (
        <span className="text-xs text-gray-600">
          Ha alcanzado el límite máximo de valores (10)
        </span>
      )}
      <div className="flex flex-wrap gap-2 mt-3">
        {attributes.dimension.map((item, index) => (
          <div key={index} className="burble">
            {item}

            <CircleX
              size={14}
              className="cursor-pointer"
              onClick={() => removeDimension(item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttributeDimension;
