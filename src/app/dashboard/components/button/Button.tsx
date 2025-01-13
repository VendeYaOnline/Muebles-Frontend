import { ReactNode } from "react";
import classes from "./Button.module.css";

interface Props {
  wFull?: boolean;
  children: string | ReactNode;
  disabled?: boolean;
  onClik?: () => void;
}

const Button = ({ children, wFull, onClik, disabled }: Props) => {
  return (
    <button
      style={{ width: wFull ? "100%" : "auto" }}
      disabled={disabled}
      onClick={onClik}
      className={
        disabled ? classes["button-disabled"] : classes["button-active"]
      }
    >
      {children}
    </button>
  );
};

export default Button;
