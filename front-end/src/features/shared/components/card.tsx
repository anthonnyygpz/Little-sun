import { AlertCircle, RefreshCw } from "lucide-react";
import { ReactNode, useState } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`flex justify-center p-6 ${className}`}>
      <article className="shadow-md p-6 w-200 rounded">{children}</article>
    </div>
  );
};

export const LoadingCard: React.FC = () => {
  return (
    <div className="justify-center p-6">
      <div className="rounded-lg bg-white shadow-md p-6">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-6 bg-slate-200 rounded w-3/4"></div>

          <div className="space-y-2">
            <div className="h-3 bg-slate-200 rounded"></div>
            <div className="h-3 bg-slate-200 rounded"></div>
            <div className="h-3 bg-slate-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ErrorCardProps {
  title?: string;
  description?: string;
  errorMessage?: string;
  onRetry?: () => void;
  showRetry?: boolean;
  technicalDetails?: string;
}

export const ErrorCard = ({
  title = "Error al cargar datos",
  description = "No se pudieron obtener los datos de la base de datos",
  errorMessage = "Ha ocurrido un error al intentar conectar con la base de datos. Por favor, inténtelo de nuevo más tarde.",
  onRetry,
  showRetry = true,
  technicalDetails = "",
}: ErrorCardProps) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    // if (!onRetry) return;

    setIsRetrying(true);
    try {
      window.location.reload();
      // console.log("Reintentar");
      // onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="flex justify-center p-6">
      <article className="shadow-md p-6 w-200 rounded-lg bg-red-50 border-red-500 border">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5  text-red-500" />
          <h2 className="text-red-500 font-bold text-2xl">{title}</h2>
        </div>
        <div className="text-gray-500">{description}</div>
        <br />
        <div>
          <p className="text-sm text-muted-foreground text-gray-500">
            {errorMessage}
          </p>
          <br />
          {technicalDetails && (
            <div className="mt-4 space-y-2">
              <details className="p-0 text-sm">
                <summary className="cursor-pointer">
                  Ver detalles técnicos
                </summary>

                <div className="">
                  <pre className="mt-2 rounded-md bg-muted p-4 text-xs overflow-auto">
                    {technicalDetails}
                  </pre>
                </div>
              </details>
            </div>
          )}
        </div>
        {showRetry && (
          <div>
            <button
              type="button"
              className="w-full bg-white hover:bg-red-200 hover:text-red-500 border-red-500 border rounded-lg items-center flex p-2 justify-center cursor-pointer transition-colors"
              onClick={handleRetry}
              disabled={isRetrying}
            >
              {isRetrying ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Intentando de nuevo...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reintentar
                </>
              )}
            </button>
          </div>
        )}
      </article>
    </div>
  );
};
