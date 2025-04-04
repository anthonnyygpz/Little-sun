import React from "react";
import DefaultLayout from "../../shared/components/defaultLayout.tsx";
import { Title } from "../../shared/components/title.tsx";
import AddServicesSection from "../../shared/components/cardAddNailService/cardAddNailService.tsx";

const AddService: React.FC = () => {
  return (
    <DefaultLayout>
      <Title title="Agregar servicios" />
      <AddServicesSection />
    </DefaultLayout>
  );
};

export default AddService;
