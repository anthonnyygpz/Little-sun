// import Tittle from "../components/Tittle";
// import DefaultLayout from "../layouts/DefaultLayout";
// // import ClientInfo from "../sections/ClientInfo";
// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { decode } from "js-base64";
// import useServices from "../hooks/useService";
//
// const UpdateClient: React.FC = () => {
//   const { data } = useParams();
//   const dataDecode = data ? JSON.parse(decode(data)) : {};
//   const [formData, setFormData] = useState({
//     clientInfo: { name: "", description: "", price: 0 },
//   });
//   const { updateServices } = useServices();
//   const navigate = useNavigate();
//
//   // const handleClientInfoChange = (data: {
//   //   name: string;
//   //   description: string;
//   //   price: number;
//   // }) => {
//   //   setFormData((prev) => ({
//   //     ...prev,
//   //     clientInfo: {
//   //       name: data.name,
//   //       description: data.description,
//   //       price: data.price,
//   //     },
//   //   }));
//   // };
//
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     await updateServices({
//       service_id: dataDecode.service_id,
//       service_name: formData.clientInfo.name,
//       description: formData.clientInfo.description,
//       price: formData.clientInfo.price,
//     });
//     navigate("/Services");
//   };
//
//   return (
//     <DefaultLayout>
//       <Tittle text="Editar cliente" classNameProps="title-purple" />
//
//       <form onSubmit={handleSubmit}>
//         {/* <ClientInfo onChange={handleClientInfoChange} is_required={false} /> */}
//         <div className="wrapper between">
//           <button type="submit" className="scale">
//             Aceptar
//           </button>
//         </div>
//       </form>
//     </DefaultLayout>
//   );
// };
//
// export default UpdateClient;
