import React from "react";
import { Table2 } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  site?: string;
}

const Header: React.FC<HeaderProps> = ({ site }) => {
  return (
    <header>
      <Link to={"/"}>
        <h2 className="logo">
          <Table2 /> Little Sun App - {site}
        </h2>
      </Link>
    </header>
  );
};

export default Header;
