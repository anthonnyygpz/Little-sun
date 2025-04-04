import { useCallback } from "react";

export const useConvertToTitle = () => {
  // Función para convertir texto a título
  const transformToTitle = useCallback((text: string): string => {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, []);
  return { transformToTitle };
};
