import { ReactNode } from "react";
import clsx from "clsx";

interface ErrorProps {
  children: ReactNode;
  className?: string;
}

function Error({ children, className }: ErrorProps) {
  return (
    <p className={clsx("text-sm font-light text-red-500", className)}>
      {children}
    </p>
  );
}

export default Error;
