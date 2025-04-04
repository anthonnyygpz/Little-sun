import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonLinkProps {
  icon?: ReactNode;
  text?: string;
  route?: string;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  icon,
  text,
  route,
}) => {
  return (
    <div className="inline-block">
      {route ? (
        <Link
          to={`${route}`}
          className="flex rounded-md px-4 py-2 text-md bg-purple-500 text-white hover:bg-purple-100 hover:text-purple-900 w-full text-left transition-colors items-center"
        >
          {icon}
          <span>{text}</span>
        </Link>
      ) : (
        <button className="flex rounded-md px-4 py-2 text-md bg-purple-500 text-white hover:bg-purple-100 hover:text-purple-900 w-full text-left transition-colors items-center">
          {icon}
          <span>{text}</span>
        </button>
      )}
    </div>
  );
};
