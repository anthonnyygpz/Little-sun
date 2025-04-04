import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants/routes";
import { Table2 } from "lucide-react";
import { MenuHamburguer } from "../MenuHambuerguer/MenuHamburguer";

export const Header: React.FC<{ site: string }> = ({ site = "" }) => {
  return (
    <header className="p-2 md:p-3">
      <MenuHamburguer />
      <div className="flex flex-col sm:flex-row justify-between w-full items-center gap-2 sm:gap-0">
        <Link className="w-full sm:w-auto" to={ROUTE_PATHS.APPOINTMENTS}>
          <div className="bg-purple-100 border-2 border-purple-400 rounded p-2 w-full">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 text-purple-500">
              <Table2 size={28} />
              <span className="font-bold text-xl md:text-2xl lg:text-3xl sm:text-left text-center truncate">
                Little Sun App {`- ${site}`}{" "}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};
