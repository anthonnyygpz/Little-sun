import { RefreshCw, AlertCircle } from "lucide-react";
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

export const Card: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={twMerge("", className)}>
      <article className="shadow-md p-6 rounded">{children}</article>
    </div>
  );
};

export const CardHeader: React.FC<{
  children?: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <h2 className={twMerge("text-lg font-bold", className)}>{children}</h2>
  );
};

export const CardContent: React.FC<{
  children?: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={twMerge("", className)}>{children}</div>;
};

interface ErrorCardProps {
  title?: string;
  description?: string;
  errorMessage?: string;
  onRetry?: () => void;
  showRetry?: boolean;
  technicalDetails?: string;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({
  title = "Error al cargar datos",
  description = "No se pudieron obtener los datos de la base de datos",
  errorMessage = "Ha ocurrido un error al intentar conectar con la base de datos. Por favor, inténtelo de nuevo más tarde.",
  onRetry,
  showRetry = true,
  technicalDetails = "",
}: ErrorCardProps) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    if (!onRetry) return;

    setIsRetrying(true);
    try {
      console.log("Reintentar");
      onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="flex justify-center">
      <article className="shadow-md p-6 w-full rounded-lg bg-red-50 border-red-500 border">
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
            <div className="mb-4 space-y-2">
              <details className="p-0 text-sm">
                <summary className="cursor-pointer">
                  Ver detalles técnicos
                </summary>

                <div>
                  <pre className="rounded-md bg-muted p-4 text-xs overflow-auto">
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
