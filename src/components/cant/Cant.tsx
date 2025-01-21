"use client";

import { Minus, Plus } from "lucide-react";
import classes from "./Cant.module.css";
import { Dispatch, SetStateAction } from "react";

interface Props {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

const Cant = ({ value = 1, setValue }: Props) => {
  return (
    <div className={classes["container-options"]}>
      <button
        className={classes["button-action"]}
        onClick={() => value !== 1 && setValue(value - 1)}
      >
        <Minus size={12} />
      </button>
      <span className={classes.value}>{value}</span>
      <button
        className={classes["button-action"]}
        onClick={() =>  value !== 10 && setValue(value + 1)}
      >
        <Plus size={12} />
      </button>
    </div>
  );
};

export default Cant;
