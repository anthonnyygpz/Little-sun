import React from "react";
import DefaultLayout from "../../shared/components/defaultLayout.tsx";
import { Title } from "../../shared/components/title.tsx";
import AddServicesSection from "../../shared/components/cardAddService/cardAddService.tsx";

const AddService: React.FC = () => {
  return (
    <DefaultLayout>
      <Title title="Agregar servicios" className="title-purple" />
      <AddServicesSection />
    </DefaultLayout>
  );
};

export default AddService;
