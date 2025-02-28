import { decode } from "js-base64";
import { ChevronLeft } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DesignService } from "../../design";
import { ButtonLink } from "../../shared/components/buttonLink";
import DefaultLayout from "../../shared/components/defaultLayout";
import EditDesignCard from "../../shared/components/cardUpdateDesign/cardUpdateDesign.tsx";
import { Title } from "../../shared/components/title";

const UpdateDesign: React.FC = () => {
  const [formData, setFormData] = useState({
    design: { design_name: "", price: 0 },
  });
  const { updateDesigns } = DesignService();
  const navigate = useNavigate();
  const { data } = useParams();
  const dataDecode = data ? JSON.parse(decode(data)) : null;

  const handleEditServiceChange = (data: {
    design_name: string;
    price: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      design: {
        design_name: data.design_name,
        price: Number(data.price),
      },
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (formData) {
      await updateDesigns({
        design_id: dataDecode.design_id,
        design_name: formData.design.design_name,
        price: formData.design.price,
      });
      navigate("/Designs");
    }
  };
  return (
    <DefaultLayout site="Actulizar Diseño">
      <Title title="Actulizar Diseño" className="title-purple" />
      <ButtonLink
        icon={<ChevronLeft size={30} />}
        text="Regresar"
        route="/Designs"
      />
      <form onSubmit={handleSubmit}>
        <EditDesignCard
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

export default UpdateDesign;
