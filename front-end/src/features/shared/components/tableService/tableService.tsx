import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { NailServiceService } from "../../../service";
import { encode } from "js-base64";
import Swal from "sweetalert2";
import { NailServiceResponse } from "../../types/nailServiceTypes.ts";

const TableService: React.FC = () => {
  const { services, getAllServices, deleteServices } = NailServiceService();

  const handleAlertDelete = async (client_id: number, nameText: string) => {
    Swal.fire({
      icon: "warning",
      title: `Desea eliminar los siguientes datos de la tabla?`,
      html: `<p>${nameText}</p>`,
      showCancelButton: true,
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await deleteServices(client_id);
          getAllServices();
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
    <div className="container-table scroll">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio Base</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service: NailServiceResponse) => (
            <tr>
              <td>{service.service_name}</td>
              <td>{service.base_price}</td>
              <td>
                <div className="container-buttons">
                  <Link
                    to={`/Services/EditServices/${encode(JSON.stringify(service))}`}
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
                        service.service_id,
                        `${service.service_name} / ${service.base_price}`,
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
export default TableService;
