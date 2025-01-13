import { CirclePlus, CircleX } from "lucide-react";
import classes from "./AttributeSize.module.css";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Attribute } from "@/app/dashboard/interfaces";
import Input from "../../input/Input";

interface Props {
  attributes: Attribute;
  setValueAttribute: Dispatch<SetStateAction<Attribute>>;
  nameAttribute: string;
  setisValid: Dispatch<SetStateAction<boolean>>;
}

const AttributeSize = ({
  attributes,
  setValueAttribute,
  nameAttribute,
  setisValid,
}: Props) => {
  const [valueSize, setValueSize] = useState<string>("");
  const [error, setError] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Z0-9]+$/;
    if (
      (e.target.value.length < 20 && regex.test(e.target.value)) ||
      e.target.value === ""
    ) {
      setValueSize(e.target.value.toLocaleUpperCase());
    }
  };

  const addSize = () => {
    if (!attributes.size.find((i) => i === valueSize)) {
      setValueAttribute({
        ...attributes,
        size: [...attributes.size, valueSize],
      });
      setError(false);
      setValueSize("");
    } else {
      setError(true);
    }
  };

  const removeSize = (name: string) => {
    const newSizes = attributes.size.filter((i) => i !== name);
    setValueAttribute({ ...attributes, size: newSizes });
  };

  useEffect(() => {
    if (nameAttribute !== "" && attributes.size.length) {
      setisValid(true);
    } else {
      setisValid(false);
    }
  }, [nameAttribute, attributes.size]);

  return (
    <div>
      <label className="text-slate-600 block mb-2">Valor</label>
      <div className="flex gap-2">
        <Input
          type="string"
          value={valueSize}
          onChange={onChange}
          placeholder="S,M,XL o 32,34,40..."
        />
        <button
          type="button"
          className={
            valueSize !== "" && attributes.size.length < 10
              ? classes["add-size-active"]
              : classes["add-size"]
          }
          onClick={addSize}
          disabled={
            (valueSize !== "" ? false : true) || attributes.size.length === 10
          }
        >
          <CirclePlus />
        </button>
      </div>
      {error && (
        <span className="text-xs text-red-700">La talla ya existe</span>
      )}
      {attributes.size.length === 10 && (
        <span className="text-xs text-gray-600">
          Ha alcanzado el límite máximo de valores (10)
        </span>
      )}
      <div className="flex flex-wrap gap-2 mt-3">
        {attributes.size.map((size, index) => (
          <div key={index} className="burble">
            {size}

            <CircleX
              size={14}
              className="cursor-pointer"
              onClick={() => removeSize(size)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttributeSize;
