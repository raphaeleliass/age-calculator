import clsx from "clsx";
import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  placeholder?: string;
  className?: string;
}

function Input({ placeholder, className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={clsx(
        "max-w-20 rounded-md py-2 pl-2 text-xl font-bold ring-1 ring-black ring-opacity-45 focus:border-none focus:outline-none focus:ring-2 focus:ring-primary-purple",
        className,
      )}
      placeholder={placeholder}
    />
  );
}

export default Input;
