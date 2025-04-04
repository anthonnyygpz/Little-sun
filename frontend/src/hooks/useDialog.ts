import Swal from "sweetalert2";

export const useDialog = () => {
  type SweetAlertIcon = "success" | "error" | "warning" | "info" | "question";

  const alert = async (
    icon: SweetAlertIcon,
    title: string,
    text: string,
    onClick: () => void,
  ) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showCancelButton: true,
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          onClick();
          Swal.fire(
            "¡Exito!",
            "Los datos fueron borrados con exito",
            "success",
          );
        }
      } catch {
        Swal.fire(
          "¡Error!",
          "A surgido un error inesperado intentelo mas tarde.",
          "error",
        );
      }
    });
  };

  return { alert };
};
