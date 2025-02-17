import { useState, useEffect } from "react";
import ContainerSection from "../components/ContainerSection";
import Label from "../components/Label";
import SubTittle from "../components/SubTittle";

interface FormDataProps {
  formData: {
    clientInfo: {
      name: string;
      phone: string;
    };
    nailSize: string;
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
  };
}

const ResumeContainer: React.FC<FormDataProps> = ({ formData }) => {
  const { clientInfo, nailSize, services, designs } = formData;
  const [totalPrice, setTotalPrice] = useState(0);

  // Función para calcular el precio total
  const calculateTotalPrice = () => {
    let totalPriceServices = 0;
    let totalPriceDesigns = 0;

    // Sumar precios de servicios
    if (services.services && services.services.length > 0) {
      totalPriceServices = services.services.reduce((acc, service) => acc + service.price, 0);
    }

    // Sumar precios de diseños
    if (designs.designs && designs.designs.length > 0) {
      totalPriceDesigns = designs.designs.reduce((acc, design) => acc + design.price, 0);
    }

    // Actualizar el estado con el total
    setTotalPrice(totalPriceServices + totalPriceDesigns);
  };

  // Ejecutar calculateTotalPrice cada vez que cambien los servicios o diseños
  useEffect(() => {
    calculateTotalPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services, designs]);

  return (
    <ContainerSection>
      <SubTittle text="Resumen" />
      <div className="wrapper label-between">
        <Label text="Nombre del cliente:" />
        <Label className="label" text={clientInfo.name} />
      </div>
      <div className="wrapper label-between">
        <Label text="Tamaño de esculpido:" />
        <Label className="label" text={nailSize} />
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
