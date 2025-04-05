import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const Label: React.FC<{
  htmlFor?: string;
  children: ReactNode;
  className?: string;
  title?: string;
  id?: string;
}> = ({ children, className, htmlFor, id, title }) => {
  return (
    <label
      className={twMerge("block text-gray-700 mb-2 font-medium", className)}
      htmlFor={htmlFor}
      title={title}
      id={id}
    >
      {children}
    </label>
  );
};
