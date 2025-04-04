import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const Title: React.FC<{
  className?: string;
  children?: ReactNode;
}> = ({ className, children }) => {
  return (
    <h2 className={twMerge("mb-8 text-3xl font-bold text-gray-800", className)}>
      {children}
    </h2>
  );
};
