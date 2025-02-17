import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonLinkProps {
  icon?: ReactNode;
  text?: string;
  route: string;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  icon,
  text,
  route,
}) => {
  return (
    <Link to={`${route}`}>
      <a>
        <div className="button-link">
          {icon}
          <span>{text}</span>
        </div>
      </a>
    </Link>
  );
};
