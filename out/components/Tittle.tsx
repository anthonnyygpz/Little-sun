import { ReactNode } from "react";

interface TittleProps {
  classNameProps: ReactNode;
  children: ReactNode;
}

const Tittle: React.FC<TittleProps> = ({ classNameProps, children }) => {
  return (
    <div className={`${classNameProps}`}>
      <h1>{children}</h1>
    </div>
  );
};

export default Tittle;
