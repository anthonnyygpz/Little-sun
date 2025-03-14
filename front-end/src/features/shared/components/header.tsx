import React from "react";
import { LogOutIcon, Table2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

interface HeaderProps {
  site?: string;
}

const Header: React.FC<HeaderProps> = ({ site }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header>
      <div className="container-navbar">
        <Link to={"/"}>
          <h2 className="logo">
            <Table2 /> Little Sun App - {site}
          </h2>
        </Link>
        <button onClick={handleLogout}>
          <div className="container-buttons">
            <LogOutIcon />
            <span>Cerrar Sesion</span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
