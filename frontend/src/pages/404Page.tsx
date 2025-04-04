import { MoveLeft } from "lucide-react";
import { Button } from "../components/common/Button";
import { ROUTE_PATHS } from "../constants/routes";

export const NotFound = () => {
  return (
    <div className="min-h-[100vh] w-full flex flex-col items-center justify-center p-4">
      <div className="text-center mb-2">
        <h1 className="text-8xl font-bold text-purple-600 m-0">404</h1>
        <h2 className="text-2xl font-semibold text-purple-400 m-4">
          Página no encontrada
        </h2>
        <p className="text-slate-500 m-0">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
      </div>
      <div className="my-8 mx-0">
        <Button
          className="inline-flex btn-purple items-center py-2 px-4 rounded-s-md font-medium transition-colors duration-200 ease-in-out"
          href={ROUTE_PATHS.APPOINTMENTS}
        >
          <MoveLeft size={30} />
          <span>Volver al inicio</span>
        </Button>
      </div>
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-indicator"></div>
        </div>
      </div>
    </div>
  );
};
