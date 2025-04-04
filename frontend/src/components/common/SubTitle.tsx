import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const SubTitle: React.FC<{
  children?: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <h3
      className={twMerge(
        "text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2",
        className,
      )}
    >
      {children}
    </h3>
  );
};
