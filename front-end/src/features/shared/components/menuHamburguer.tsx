import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "./buttonLink";

export const MenuHamburguer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="content-button-hamburguer">
      {isOpen && (
        <div className="container-link">
          <div className="scroll">
            <div className="link">
              <ButtonLink text="Generar cita" route="/GenerateQuote" />
              <ButtonLink text="Clientes" route="/Clients" />
              <ButtonLink text="Servicios" route="/Services" />
              <ButtonLink text="Diseños" route="/Designs" />
              <ButtonLink text="Analisis" route="/Analysis" />
            </div>
          </div>
        </div>
      )}

      <button onClick={toggleMenu}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};
