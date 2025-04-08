import { useState } from "react";

export const useMobilTable = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };
  const nextPage = () => console.log("Siguente pagina");
  const prevPage = () => console.log("Anterior pagina");
  return { expandedRow, toggleRow, nextPage, prevPage };
};
