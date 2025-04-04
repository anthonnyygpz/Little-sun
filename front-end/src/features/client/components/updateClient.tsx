import { Title } from "../../shared/components/title.tsx";
import DefaultLayout from "../../shared/components/defaultLayout.tsx";
import ClientInfo from "../../shared/components/cardClientInfo/cardClientInfo.tsx";
import { useState } from "react";
import { ClientService } from "../../client";
import { useNavigate, useParams } from "react-router-dom";
import { decode } from "js-base64";
import Button from "../../shared/components/button.tsx";
import { ClientUpdate } from "../../shared/types/clientTypes.ts";

const UpdateClient: React.FC = () => {
  const { data } = useParams();
  const dataDecode = data ? JSON.parse(decode(data)) : {};
  const [formData, setFormData] = useState({
    clientInfo: { name: "", phone: "" },
  });
  const { updateClients } = ClientService();
  const navigate = useNavigate();

  const handleClientInfoChange = (data: { name: string; phone: string }) => {
    setFormData((prev) => ({
      ...prev,
      clientInfo: { name: data.name, phone: data.phone },
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data: ClientUpdate = {};
    if (formData.clientInfo.name) {
      data["name"] = formData.clientInfo.name;
    }

    if (formData.clientInfo.phone) {
      data["phone_number"] = formData.clientInfo.phone;
    }
    await updateClients(dataDecode.client_id, data);
    navigate("/Clients");
  };

  return (
    <DefaultLayout>
      <Title title="Editar cliente" />

      <form onSubmit={handleSubmit}>
        <ClientInfo onChange={handleClientInfoChange} />
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            type="submit"
            className="w-full sm:w-1/2 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50  cursor-pointer"
          >
            Aceptar
          </Button>
        </div>
      </form>
    </DefaultLayout>
  );
};

export default UpdateClient;
