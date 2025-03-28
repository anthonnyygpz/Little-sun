import { Title } from "../../shared/components/title.tsx";
import DefaultLayout from "../../shared/components/defaultLayout.tsx";
import ClientInfo from "../../shared/components/cardClientInfo/cardClientInfo.tsx";
import { useState } from "react";
import { ClientService } from "../../client";
import { useNavigate, useParams } from "react-router-dom";
import { decode } from "js-base64";

const UpdateClient: React.FC = () => {
  const { data } = useParams();
  const dataDecode = data ? JSON.parse(decode(data)) : {};
  const [formData, setFormData] = useState({
    clientInfo: { name: "", phone: 0 },
  });
  const { updateClients } = ClientService();
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
      phone_number: formData.clientInfo.phone,
    });
    navigate("/Clients");
  };

  return (
    <DefaultLayout>
      <Title title="Editar cliente" className="title-purple" />

      <form onSubmit={handleSubmit}>
        <ClientInfo onChange={handleClientInfoChange} />
        <div className="wrapper between">
          <button type="submit" className="scale">
            Aceptar
          </button>
        </div>
      </form>
    </DefaultLayout>
  );
};

export default UpdateClient;
