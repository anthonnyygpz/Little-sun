import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalAltertProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  showCancelButton?: boolean;
}

export const ModalAlert: React.FC<ModalAltertProps> = ({
  isOpen,
  onClose,
  title,
  children,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  onConfirm,
  showCancelButton = true,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <dialog
        open
        className="relative z-10 mx-auto my-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">{title}</h3>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            aria-label="Cerrar"
          >
            <X size="28" />
          </button>
        </div>

        <div className="mb-6">{children}</div>

        <div className="flex justify-end space-x-4">
          {showCancelButton && (
            <button
              onClick={onClose}
              className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={handleConfirm}
            className="rounded-md bg-red-400 px-4 py-2 text-white transition-colors hover:bg-red-600"
          >
            {confirmText}
          </button>
        </div>
      </dialog>
    </div>
  );
};
