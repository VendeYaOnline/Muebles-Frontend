import { Attribute } from "@/app/dashboard/interfaces";
import classes from "./AttributeMilliliter.module.css";
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
  nameAttribute: string;
  attributes: Attribute;
  setisValid: Dispatch<SetStateAction<boolean>>;
  setValueAttribute: Dispatch<SetStateAction<Attribute>>;
}

const AttributeMilliliter = ({
  attributes,
  setValueAttribute,
  nameAttribute,
  setisValid,
}: Props) => {
  const [valueMililiter, setValueMililiter] = useState("");
  const [error, setError] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 10) {
      setValueMililiter(e.target.value);
    }
  };

  const addMililitir = () => {
    if (!attributes.mililitir.find((i) => i === valueMililiter)) {
      setValueAttribute({
        ...attributes,
        mililitir: [...attributes.mililitir, valueMililiter],
      });
      setError(false);
      setValueMililiter("");
    } else {
      setError(true);
    }
  };

  const removeMililitir = (name: string) => {
    const newDimensions = attributes.mililitir.filter((i) => i !== name);
    setValueAttribute({ ...attributes, mililitir: newDimensions });
  };

  useEffect(() => {
    if (nameAttribute !== "" && attributes.mililitir.length) {
      setisValid(true);
    } else {
      setisValid(false);
    }
  }, [nameAttribute, attributes.mililitir]);

  return (
    <div>
      <label className="text-slate-600 block mb-2">Valor</label>
      <div className="flex gap-2">
        <Input
          type="number"
          value={valueMililiter}
          onChange={onChange}
          placeholder="5, 10, 15, 20..."
        />

        <button
          type="button"
          className={
            valueMililiter !== "" && attributes.mililitir.length < 10
              ? classes["add-mililitir-active"]
              : classes["add-mililitir"]
          }
          onClick={addMililitir}
          disabled={
            (valueMililiter !== "" ? false : true) ||
            attributes.mililitir.length === 10
          }
        >
          <CirclePlus />
        </button>
      </div>
      {error && (
        <span className="text-xs text-red-700">La dimensión ya existe</span>
      )}

      {attributes.mililitir.length === 10 && (
        <span className="text-xs text-gray-600">
          Ha alcanzado el límite máximo de valores (10)
        </span>
      )}

      <div className="flex flex-wrap gap-2 mt-3">
        {attributes.mililitir.map((item, index) => (
          <div key={index} className="burble">
            {item}

            <CircleX
              size={14}
              className="cursor-pointer"
              onClick={() => removeMililitir(item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttributeMilliliter;
