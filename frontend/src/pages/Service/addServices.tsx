import React from "react";
import DefaultLayout from "../../layouts/defaultLayout.tsx";
import { Title } from "../../components/title.tsx";
import AddServicesSection from "../../sections/addServices.tsx";

const AddService: React.FC = () => {
  return (
    <DefaultLayout>
      <Title title="Agregar servicios" className="title-purple" />
      <AddServicesSection />
    </DefaultLayout>
  );
};

export default AddService;
