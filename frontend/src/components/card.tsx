import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="wrapper">
      <article className="card">{children}</article>
    </div>
  );
};

export default Card;
