import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "./ButtonLink";

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
              <ButtonLink text="Clientes" route="/GenerateQuote" />
              <ButtonLink text="Servicios" route="/GenerateQuote" />
              <ButtonLink text="Diseños" route="/GenerateQuote" />
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante */}
      <button onClick={toggleMenu}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};
