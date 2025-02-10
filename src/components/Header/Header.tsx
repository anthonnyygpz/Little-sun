import React from "react";
import "../../styles/css/header.css";
import { Table2 } from "lucide-react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header>
      <Link to={"/"}>
        <h2 className="logo">
          <Table2 /> Little Sun App
        </h2>
      </Link>
    </header>
  );
};

export default Header;
