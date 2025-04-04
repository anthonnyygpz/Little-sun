import { ReactNode } from "react";
import { Header } from "../../common/Header";

export const MainLayout: React.FC<{ site: string; children: ReactNode }> = ({
  site,
  children,
}) => {
  return (
    <>
      <Header site={site} />
      <main>{children}</main>
    </>
  );
};
