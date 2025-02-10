import { ReactNode } from "react";

interface TittleProps {
  classNameProps: ReactNode;
  text: ReactNode;
}

const Tittle: React.FC<TittleProps> = ({ classNameProps, text: children }) => {
  return (
    <div className={`${classNameProps}`}>
      <h1>{children}</h1>
    </div>
  );
};

export default Tittle;
