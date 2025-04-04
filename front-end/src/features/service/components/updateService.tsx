import { decode } from "js-base64";
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../shared/components/title.tsx";
import { NailServiceService } from "../";
import DefaultLayout from "../../shared/components/defaultLayout.tsx";
import CardEditService from "../../shared/components/cardEditService/cardEditService.tsx";
import { ButtonLink } from "../../shared/components/buttonLink.tsx";
import { ChevronLeft } from "lucide-react";

const UpdateService: React.FC = () => {
  const [formData, setFormData] = useState({
    service: { service_name: "", price: 0 },
  });
  const { updateServices } = NailServiceService();
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
        base_price: formData.service.price,
      });
      navigate("/Services");
    }
  };

  return (
    <DefaultLayout site="Aculizar Servicio">
      <form onSubmit={handleSubmit}>
        <Title title="Actulizar Servicio" />
        <ButtonLink
          icon={<ChevronLeft size={30} />}
          text="Regresar"
          route="/Services"
        />
        <CardEditService
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

export default UpdateService;
