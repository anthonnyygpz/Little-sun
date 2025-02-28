import { MoveLeft } from "lucide-react";

import { ButtonLink } from "../components/buttonLink.tsx";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Página no encontrada</h2>
        <p className="not-found-text">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
      </div>
      <div className="not-found-button-container">
        <ButtonLink
          icon={<MoveLeft size={30} />}
          text="Volver al inicio"
          route="/"
        />
      </div>
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-indicator"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
