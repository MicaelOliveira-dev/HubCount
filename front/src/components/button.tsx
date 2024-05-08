import React, { MouseEventHandler } from "react";

interface ButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  onlyBorder: boolean;
  onClick?: MouseEventHandler<undefined & HTMLInputElement> | undefined;
  children?: React.ReactNode;
  green: boolean;
  small: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
}
const Button = ({
  type,
  onlyBorder,
  onClick,
  children,
  green,
  small,
  fullWidth,
  disabled
}: ButtonProps) => {
  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`text-newWhite font-bold text-center transition duration-300 flex flex-row items-center ${fullWidth ? "w-full justify-center" : "w-fit"} px-4 gap-x-4 ${small ? "py-2 px-6 text-xs rounded-md" : "py-2 rounded-lg"} ${disabled ? "disabled:cursor-not-allowed disabled:bg-primary/40 text-bodyColor/40" : "active:scale-95"}
        ${
          green
            ? onlyBorder
              ? "border border-primaryNeon hover:bg-primaryNeon"
              : "bg-primary hover:bg-primaryOnHover"
            : onlyBorder
            ? "border border-primaryBgBorder hover:bg-primaryBgBorder"
            : "bg-primaryBg hover:bg-primaryBg/80"
        }`}
        type={type}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
