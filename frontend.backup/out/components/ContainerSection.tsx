import { ReactNode } from "react";

interface ContentSectionProps {
  children: ReactNode;
}

const ContainerSection: React.FC<ContentSectionProps> = ({ children }) => {
  return (
    <div className="wrapper">
      <article className="card">{children}</article>
    </div>
  );
};

export default ContainerSection;
