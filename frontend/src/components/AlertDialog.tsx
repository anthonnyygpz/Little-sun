import Button from "../components/Buttons/button.tsx";
import Swal from "sweetalert2";

interface AlertDialogProps {
  nameText: string;
  nameSection: string;
  onChange: (deleteData: boolean) => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  nameText,
  nameSection,
  onChange,
}) => {
  const handleAlertDelete = () => {
    Swal.fire({
      icon: "warning",
      title: `Desea eliminar los siguientes datos?`,
      html: `<p>${nameText} de la seccion de ${nameSection}</p>`,
      showCancelButton: true,
    }).then((result) => {
      try {
        if (result.isConfirmed) {
          onChange(true);
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
  return <Button text="Eliminar" onClick={() => handleAlertDelete()} />;
};

export default AlertDialog;
