import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  onClick,
  type = "button",
  href,
}) => {
  if (href) {
    return (
      <Link to={href} onClick={onClick} className={twMerge("", className)}>
        {children}
      </Link>
    );
  } else {
    return (
      <button
        type={type}
        onClick={onClick}
        className={twMerge("btn-purple rounded px-2 py-1", className)}
      >
        {children}
      </button>
    );
  }
};
