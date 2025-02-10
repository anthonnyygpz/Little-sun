import ContainerSection from "../components/ContainerSection";
import Label from "../components/Label";
import SubTittle from "../components/SubTittle";

interface FormDataProps {
  formData: {
    clientInfo: {
      name: string;
      phone: number;
    };
    nailSize: {
      selectedValue: string;
      id: number;
    };
    services: {
      options: number[];
      services: {
        name: string;
        price: number;
      }[];
    };
    designs: {
      options: number[];
      designs: {
        name: string;
        price: number;
      }[];
    };
    totalPrice: number;
    status: { selectedValue: "", id: 0 },
  };
}

const ResumeContainer: React.FC<FormDataProps> = ({ formData }) => {
  const { clientInfo, nailSize, services, designs, totalPrice } = formData;



  return (
    <ContainerSection>
      <SubTittle text="Resumen" />
      <div className="wrapper label-between">
        <Label text="Nombre del cliente:" />
        <Label className="label" text={clientInfo.name} />
      </div>
      <div className="wrapper label-between">
        <Label text="Tamaño de esculpido:" />
        <Label className="label" text={nailSize.selectedValue} />
      </div>

      <Label text="Servicios seleccionados:" />
      {services.services && services.services.length > 0
        ? services.services.map((service, index) => (
          <div key={index} className="wrapper label-between">
            <Label text={service.name} />
            <Label className="label" text={`$${service.price}`} />{" "}
          </div>
        ))
        : ""}

      <div className="divider"></div>
      <Label text="Diseños seleccionados:" />
      {designs.designs && designs.designs.length > 0
        ? designs.designs.map((design, index) => (
          <div key={index} className="wrapper label-between">
            <Label text={`Diseño ${design.name}`} />
            <Label className="label" text={`$${design.price}`} />{" "}
          </div>
        ))
        : ""}

      <div className="divider"></div>
      <div className="wrapper label-between">
        <Label text="Total:" />
        <Label className="label" text={`$${totalPrice}`} />
      </div>
    </ContainerSection>
  );
};

export default ResumeContainer;
