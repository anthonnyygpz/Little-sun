import { useState } from "react";

export const useModalAlert = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);

  const openDialog = (data = null) => {
    setDialogData(data);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    // Opcional: limpiar los datos después de un tiempo para permitir animaciones de cierre
    setTimeout(() => setDialogData(null), 200);
  };

  return {
    isOpen,
    dialogData,
    openDialog,
    closeDialog,
  };
};
