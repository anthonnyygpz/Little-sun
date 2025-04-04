import React from "react";
import { Table2 } from "lucide-react";
import { Link } from "react-router-dom";
import { MenuHamburguer } from "./menuHamburguer/menuHamburguer";

interface HeaderProps {
  site?: string;
}

const Header: React.FC<HeaderProps> = ({ site }) => {
  return (
    <header className="p-2 md:p-3">
      <MenuHamburguer />
      <div className="flex flex-col sm:flex-row justify-between w-full items-center gap-2 sm-gap-0">
        <Link to="/" className="w-full sm:w-auto">
          <div className="bg-purple-100 border-2 border-purple-400 rounded p-2 w-full">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1">
              <Table2 className="text-purple-500" size={28} />
              <span className="text-purple-500 font-bold text-xl md:text-2xl lg:text-3xl text-center sm:text-left truncate">
                Little Sun App {`- ${site}`}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
