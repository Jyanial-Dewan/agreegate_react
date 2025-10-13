import type { MouseEventHandler, ReactNode } from "react";
import Loader from "../common/Loader";

type ButtonType = "submit" | "button" | "reset";
type StyleType = "full" | "rectangular" | "square";

interface IButtonProps {
  name?: string;
  styleType: StyleType;
  children?: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  type?: ButtonType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  backgroundColor?: string;
}

const CustomButton = ({
  name,
  type,
  styleType,
  children,
  disabled,
  isLoading,
  onClick,
  backgroundColor = "#1c3ba4",
}: IButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`p-2 rounded-lg bg-[${backgroundColor}] capitalize text-white hover:opacity-90 ${
        disabled ? "opacity-60 cursor-not-allowed" : " cursor-pointer"
      } ${styleType === "full" && "w-full"} ${
        styleType === "rectangular" && "px-5"
      }`}
      onClick={onClick}
    >
      {isLoading ? <Loader color="white" /> : `${name ? name : ""}`}
      {children}
    </button>
  );
};

export default CustomButton;
