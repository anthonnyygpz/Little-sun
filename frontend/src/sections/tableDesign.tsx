import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { encode } from "js-base64";
import Swal from "sweetalert2";
import useDesignApi from "../hooks/useDesignApi.tsx";
import { DesignResponse } from "../models/design.models.ts";

const TableDesign: React.FC = () => {
  const { designs, deleteDesigns } = useDesignApi();
  const handleAlertDelete = async (design_id: number, nameText: string) => {
    Swal.fire({
      icon: "warning",
      title: `Desea eliminar los siguientes datos de la tabla?`,
      html: `<p>${nameText}</p>`,
      showCancelButton: true,
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await deleteDesigns(design_id);
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

  return (
    <div className="container-table">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio Base</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {designs.map((design: DesignResponse) => (
            <tr>
              <td>{design.design_name}</td>
              <td>{design.price}</td>
              <td>
                <div className="container-buttons">
                  <Link
                    to={`/Designs/EditDesigns/${encode(JSON.stringify(design))}`}
                  >
                    <button className="button-edit">
                      <Pencil />
                      <span>Editar</span>
                    </button>
                  </Link>
                  <button
                    className="delete-button"
                    onClick={() =>
                      handleAlertDelete(
                        design.design_id,
                        `${design.design_name}/ ${design.price}`,
                      )
                    }
                  >
                    <Trash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableDesign;
