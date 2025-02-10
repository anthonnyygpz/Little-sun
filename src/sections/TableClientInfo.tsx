import { Link } from "react-router-dom";
import useClients from "../hooks/useClient";
import { Client } from "../models/Client.modesls";
import { Pencil, Trash } from "lucide-react";
import Swal from "sweetalert2";
import { encode } from 'js-base64';

const TableClientsInfo: React.FC = () => {
  const { clientAll, deleteClients, getAll } = useClients();


  const handleAlertDelete = async (client_id: number, nameText: string) => {
    Swal.fire({
      icon: "warning",
      title: `Desea eliminar los siguientes datos de la tabla?`,
      html: `<p>${nameText}</p>`,
      showCancelButton: true,
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await deleteClients(client_id);
          getAll();
          Swal.fire(
            '¡Exito!',
            'Los datos fueron borrados con exito',
            'success'
          );
        }
      } catch {
        Swal.fire(
          '¡Error!',
          'A surgido un error inesperado intentelo mas tarde.',
          'error'
        );
      }
    });
  }


  return <div className="table-content">

    <table>
      <thead>
        <tr>
          <th>Nombre del cliente</th>
          <th>Telefono del cliente</th>
          <th>Fecha de creacion</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clientAll?.map((client: Client) => (
          <tr>
            <td>{client.name}</td>
            <td>{client.phone_number}</td>
            <td>{client.created_at}</td>
            <td>
              <div className="content-buttons">
                <Link to={`/Clients/UpdateClient/${encode(JSON.stringify(client))}`}>
                  <button className="edit-button" >
                    <span className="icon-edit">
                      <Pencil /> Editar
                    </span>
                  </button>
                </Link>
                <button className="delete-button" onClick={() =>
                  handleAlertDelete(client.client_id,
                    `${client.name}/ ${client.phone_number}`
                  )}>
                  <Trash />
                </button>

              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}

export default TableClientsInfo;
