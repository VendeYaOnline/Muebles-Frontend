import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Input from "../../input/Input";
import classes from "./AttributeWeight.module.css";
import { Attribute } from "@/app/dashboard/interfaces";
import { CirclePlus, CircleX } from "lucide-react";

interface Props {
  attributes: Attribute;
  setValueAttribute: Dispatch<SetStateAction<Attribute>>;
  nameAttribute: string;
  setisValid: Dispatch<SetStateAction<boolean>>;
}

const AttributeWeight = ({
  attributes,
  nameAttribute,
  setValueAttribute,
  setisValid,
}: Props) => {
  const [valueWeight, setValueWeight] = useState("");
  const [error, setError] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Z0-9]+$/;
    if (
      (e.target.value.length < 20 && regex.test(e.target.value)) ||
      e.target.value === ""
    ) {
      setValueWeight(e.target.value.toLocaleUpperCase());
    }
  };

  const addWeight = () => {
    if (!attributes.weight.find((i) => i === valueWeight)) {
      setValueAttribute({
        ...attributes,
        weight: [...attributes.weight, valueWeight],
      });
      setError(false);
      setValueWeight("");
    } else {
      setError(true);
    }
  };

  const removeWeight = (name: string) => {
    const newWeights = attributes.weight.filter((i) => i !== name);
    setValueAttribute({ ...attributes, weight: newWeights });
  };

  useEffect(() => {
    if (nameAttribute !== "" && attributes.weight.length) {
      setisValid(true);
    } else {
      setisValid(false);
    }
  }, [nameAttribute, attributes.weight]);

  return (
    <div>
      <label>Valor</label>
      <div className="flex gap-2">
        <Input
          value={valueWeight}
          onChange={onChange}
          placeholder="5LB,10LB o 5KG,10KG..."
        />
        <button
          type="button"
          className={
            valueWeight !== "" && attributes.weight.length < 10
              ? classes["add-weight-active"]
              : classes["add-weight"]
          }
          onClick={addWeight}
          disabled={
            (valueWeight !== "" ? false : true) ||
            attributes.weight.length === 10
          }
        >
          <CirclePlus />
        </button>
      </div>
      {error && <span className="text-xs text-red-700">El peso ya existe</span>}

      {attributes.weight.length === 10 && (
        <span className="text-xs text-gray-600">
          Ha alcanzado el límite máximo de valores (10)
        </span>
      )}
      <div className="flex flex-wrap gap-2 mt-3">
        {attributes.weight.map((item, index) => (
          <div key={index} className="burble">
            {item}

            <CircleX
              size={14}
              className="cursor-pointer"
              onClick={() => removeWeight(item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttributeWeight;
