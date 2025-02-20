import { decode } from "js-base64";
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../components/title.tsx";
import useServiceApi from "../../hooks/useServiceApi.ts";
import DefaultLayout from "../../layouts/defaultLayout.tsx";
import EditServiceCard from "../../sections/editServiceCard.tsx";
import Button from "../../components/Buttons/button.tsx";
import { ButtonLink } from "../../components/Buttons/buttonLink.tsx";
import { ChevronLeft } from "lucide-react";

const EditServices: React.FC = () => {
  const [formData, setFormData] = useState({
    service: { service_name: "", price: 0 },
  });
  const { updateServices } = useServiceApi();
  const navigate = useNavigate();
  const { data } = useParams();
  const dataDecode = data ? JSON.parse(decode(data)) : null;

  const handleEditServiceChange = (data: {
    service_name: string;
    price: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      service: {
        service_name: data.service_name,
        price: Number(data.price),
      },
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (formData) {
      await updateServices({
        service_id: dataDecode.service_id,
        service_name: formData.service.service_name,
        price: formData.service.price,
      });
      navigate("/Services");
    }
  };

  return (
    <DefaultLayout site="Aculizar Servicio">
      <form onSubmit={handleSubmit}>
        <Title title="Actulizar Servicio" className="title-purple" />
        <ButtonLink
          icon={<ChevronLeft size={30} />}
          text="Regresar"
          route="/Designs"
        />
        <EditServiceCard
          onChange={handleEditServiceChange}
          defaultService={dataDecode}
        />
        <div className="wrapper between">
          <button type="submit" className="scale">
            Aceptar
          </button>
        </div>
      </form>
    </DefaultLayout>
  );
};

export default EditServices;
