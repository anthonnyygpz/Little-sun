// import { Link } from "react-router-dom";
// import useServices from "../hooks/useService";
// import { Plus, Trash2 } from "lucide-react";
// // import { encode } from "js-base64";
// import Swal from "sweetalert2";
// import { ServiceResponse } from "../models/Services.models";
//
// const TableService: React.FC = () => {
//   const { services, getAllServices, deleteServices } = useServices();
//
//   const handleAlertDelete = async (client_id: number, nameText: string) => {
//     Swal.fire({
//       icon: "warning",
//       title: `Desea eliminar los siguientes datos de la tabla?`,
//       html: `<p>${nameText}</p>`,
//       showCancelButton: true,
//     }).then(async (result) => {
//       try {
//         if (result.isConfirmed) {
//           await deleteServices(client_id);
//           getAllServices();
//           Swal.fire(
//             "¡Exito!",
//             "Los datos fueron borrados con exito",
//             "success",
//           );
//         }
//       } catch {
//         Swal.fire(
//           "¡Error!",
//           "A surgido un error inesperado intentelo mas tarde.",
//           "error",
//         );
//       }
//     });
//   };
//
//   return (
//     <div className="table-content">
//       <Link to="/Services/AddServices">
//         <button>
//           <span className="icon-text">
//             <Plus /> Crear servicio
//           </span>
//         </button>
//         <br /> <br />
//       </Link>
//       <table>
//         <thead>
//           <tr>
//             <th>Nombre</th>
//             <th>Precio Base</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {services.map((service: ServiceResponse) => (
//             <tr>
//               <td>{service.service_name}</td>
//               <td>{service.price}</td>
//               <td>
//                 <div className="content-buttons">
//                   {/* Se implementara en el futuro */}
//                   {/* <Link */}
//                   {/*   to={`/Clients/UpdateClient/${encode(JSON.stringify(service))}`} */}
//                   {/* > */}
//                   {/*   <button className="edit-button"> */}
//                   {/*     <span className="icon-edit"> */}
//                   {/*       <Pencil /> Editar */}
//                   {/*     </span> */}
//                   {/*   </button> */}
//                   {/* </Link> */}
//                   <button
//                     className="delete-button"
//                     onClick={() =>
//                       handleAlertDelete(
//                         service.service_id,
//                         `${service.service_name}/ ${service.price}`,
//                       )
//                     }
//                   >
//                     <Trash2 />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
// export default TableService;
