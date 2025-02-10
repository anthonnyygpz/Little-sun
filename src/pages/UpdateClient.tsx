import Tittle from "../components/Tittle";
import DefaultLayout from "../layouts/DefaultLayout"
import ClientInfo from "../sections/ClientInfo";
import { useState } from "react";
import useClients from "../hooks/useClient";
import { useNavigate, useParams } from "react-router-dom";
import { decode } from "js-base64";


const UpdateClient: React.FC = () => {
  const { data } = useParams();
  const dataDecode = JSON.parse(decode(data));
  const [formData, setFormData] = useState({
    clientInfo: { name: "", phone: 0 },
  })
  const { updateClients } = useClients();
  const navigate = useNavigate();

  const handleClientInfoChange = (data: { name: string; phone: string }) => {
    setFormData((prev) => ({
      ...prev,
      clientInfo: { name: data.name, phone: Number(data.phone) },
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await updateClients({
      client_id: dataDecode.client_id,
      name: formData.clientInfo.name,
      phone_number: formData.clientInfo.phone
    })
    navigate("/Clients");
  }

  return <DefaultLayout>
    <Tittle text="Editar cliente" classNameProps="title-purple" />

    <form onSubmit={handleSubmit}>
      <ClientInfo onChange={handleClientInfoChange} is_required={false} />
      <div className="wrapper between">
        <button type="submit" className="scale">Editar Cliente</button>
      </div>
    </form>
  </DefaultLayout>
}

export default UpdateClient;
