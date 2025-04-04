import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const Label: React.FC<{
  htmlFor?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}> = ({ children, className, htmlFor, id }) => {
  return (
    <label
      className={twMerge("block text-gray-700 mb-2 font-medium", className)}
      htmlFor={htmlFor}
      id={id}
    >
      {children}
    </label>
  );
};
