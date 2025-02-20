import Swal from "sweetalert2";
import useQuoteApi from "./useQuoteApi.ts";

export const useAlert = () => {
  const { deleteQuote, getAllQuotes } = useQuoteApi();

  const handleAlertDelete = async (quote_id: number, nameText: string) => {
    Swal.fire({
      icon: "warning",
      title: `Desea eliminar los siguientes datos de la tabla?`,
      html: `<p>${nameText}</p>`,
      showCancelButton: true,
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await deleteQuote(quote_id);
          getAllQuotes();
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

  return { handleAlertDelete };
};
