import { ReactNode } from "react";

interface Props {
  wFull?: boolean;
  children: string | ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ children, wFull, onClick, disabled }: Props) => {
  return (
    <button
      style={{ width: wFull ? "100%" : "auto" }}
      disabled={disabled}
      onClick={onClick}
      className={`w-full flex justify-center items-center gap-4 rounded-lg bg-gradient-to-br from-blue-800 to-blue-500 px-4 py-3 font-medium text-white transition duration-300 focus:outline-none focus:ring-indigo-300 ${
        disabled
          ? "opacity-70"
          : "cursor-pointer hover:from-blue-600 hover:to-blue-400 hover:shadow-lg"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
