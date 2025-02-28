import { ReactNode } from "react";
import Header from "./header.tsx";

interface DefaultLayoutProps {
  children: ReactNode;
  site?: string;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, site }) => {
  return (
    <>
      <Header site={site} />
      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;
