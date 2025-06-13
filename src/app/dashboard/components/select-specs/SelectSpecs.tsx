import { CirclePlus, CircleX } from "lucide-react";
import Input from "../input/Input";
import classes from "./SelectSpecs.module.css";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  specs: { title: string; text: string }[];
  setSpecs: Dispatch<
    SetStateAction<
      {
        title: string;
        text: string;
      }[]
    >
  >;
}

const SelectSpecs = ({ specs, setSpecs }: Props) => {
  const [values, setValues] = useState({ title: "", text: "" });
  const [error, setError] = useState(false);

  const addSpec = () => {
    if (specs.find((i) => i.title === values.title)) {
      setError(true);
    } else {
      setError(false);
      setSpecs([...specs, values]);
      setValues({ title: "", text: "" });
    }
  };

  const removeSpec = (title: string) => {
    const result = specs.filter((i) => i.title !== title);
    setSpecs(result);
  };

  return (
    <div className="flex flex-col gap-1">
      <label>Especificaciones</label>
      <div className={classes["container-specs"]}>
        <Input
          placeholder="Titulo"
          maxLength={20}
          value={values.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
        />
        <Input
          placeholder="Texto"
          maxLength={20}
          value={values.text}
          onChange={(e) => setValues({ ...values, text: e.target.value })}
        />
        <button
          type="button"
          onClick={() => addSpec()}
          disabled={values.title !== "" && values.text !== "" ? false : true}
          className={
            values.title !== "" && values.text !== ""
              ? classes["addSpecs-active"]
              : classes["addSpecs-disabled"]
          }
        >
          <CirclePlus />
        </button>
      </div>
      <div className="flex gap-2 flex-wrap max-h-16 mt-2 overflow-auto">
        {specs.map((item) => (
          <div
            key={item.title}
            className="bg-[#1B56FD] text-white p-1 rounded-md text-xs flex items-center gap-2"
          >
            {item.title}
            <CircleX
              size={14}
              className="cursor-pointer"
              onClick={() => removeSpec(item.title)}
            />
          </div>
        ))}
      </div>
      {error && (
        <span className="text-xs text-red-700">
          La especificación ya existe
        </span>
      )}
    </div>
  );
};

export default SelectSpecs;
