import { decode } from "js-base64";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteAppointmentDesign } from "../../../lib/enpoints/appointmentDesignApi.ts";
import { deleteAppointmentService } from "../../../lib/enpoints/appointmentServiceApi.ts";
import { AppointmentService } from "../../appointment";
import { ButtonLink } from "../../shared/components/buttonLink.tsx";
import ClientInfo from "../../shared/components/cardClientInfo/cardClientInfo.tsx";
import Design from "../../shared/components/cardNailDesign/cardNailDesign.tsx";
import Resume from "../../shared/components/cardResume/cardResume.tsx";
import SculpingNailSize from "../../shared/components/cardSculpingNailSize/cardSculpingNailSize.tsx";
import ServicesSection from "../../shared/components/cardNailService/cardNailService.tsx";
import DefaultLayout from "../../shared/components/defaultLayout.tsx";
import Statu from "../../shared/components/statu/statu.tsx";
import { Title } from "../../shared/components/title.tsx";

const UpdateQuote: React.FC = () => {
  const { data } = useParams();
  const dataDecode = data ? JSON.parse(decode(data)) : null;
  const { editAppointment, deleteNailSize } = AppointmentService();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientInfo: { name: "", phone: 0 },
    nailSize: { selectedValue: "", id: 0 },
    services: {
      options: [] as number[],
      services: [] as { name: string; price: number }[], // Cambiado a array
    },
    designs: {
      options: [] as number[],
      designs: [] as { name: string; price: number }[], // Cambiado a array
    },
    totalPrice: 0,
    status: { selectedValue: "", id: 0 },
  });

  const [isDeleteSculpingSize, setIsDeleteSculpingSize] = useState<boolean>();
  const [isDeleteService, setIsDeleteService] = useState<boolean>();
  const [isDeleteDesign, setIsDeleteDesign] = useState<boolean>();

  // Función para calcular el precio total
  const calculateTotalPrice = () => {
    let totalPriceServices = 0;
    let totalPriceDesigns = 0;

    // Sumar precios de servicios
    if (formData.services.services && formData.services.services.length > 0) {
      totalPriceServices = formData.services.services.reduce(
        (acc, service) => acc + service.price,
        0,
      );
    }

    // Sumar precios de diseños
    if (formData.designs.designs && formData.designs.designs.length > 0) {
      totalPriceDesigns = formData.designs.designs.reduce(
        (acc, design) => acc + design.price,
        0,
      );
    }

    // Actualizar el estado con el total
    setFormData((prev) => ({
      ...prev,
      totalPrice: totalPriceServices + totalPriceDesigns,
    }));
  };

  // Ejecutar calculateTotalPrice cada vez que cambien los servicios o diseños
  useEffect(() => {
    calculateTotalPrice();
  }, [formData.services, formData.designs]); // Agrega dependencias

  const resetAll = () => {
    setFormData({
      clientInfo: { name: "", phone: 0 },
      nailSize: { selectedValue: "", id: 0 as number },
      services: {
        options: [] as number[],
        services: [] as { name: string; price: number }[],
      },
      designs: {
        options: [] as number[],
        designs: [] as { name: string; price: number }[],
      },
      totalPrice: 0,
      status: { selectedValue: "", id: 0 },
    });
    setIsDeleteSculpingSize(false);
    setIsDeleteService(false);
  };

  const handleClientInfoChange = (data: { name: string; phone: string }) => {
    setFormData((prev) => ({
      ...prev,
      clientInfo: { name: data.name, phone: Number(data.phone) },
    }));
  };

  const handleNailSizeChange = (data: {
    selectedValue: string;
    id: number;
  }) => {
    setFormData((prev) => ({
      ...prev,
      nailSize: data,
    }));
  };

  const handleServicesChange = (data: {
    options: number[];
    services: { name: string; price: number }[];
  }) => {
    setFormData((prev) => ({
      ...prev,
      services: data,
    }));
  };

  const handleDesignChange = (data: {
    options: number[];
    designs: { name: string; price: number }[];
  }) => {
    setFormData((prev) => ({
      ...prev,
      designs: data,
    }));
  };

  const handleStatusChange = (data: { selectedValue: string; id: number }) => {
    setFormData((prev) => ({
      ...prev,
      status: data,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await editAppointment({
      appointment_id: dataDecode.appointment_id,
      client_id: dataDecode.client_id,
      nail_size_id: formData.nailSize.id,
      client_name: formData.clientInfo.name,
      phone_number: formData.clientInfo.phone,
      total_amount: formData.totalPrice,
      nail_designs: formData.designs.options,
      nail_services: formData.services.options,
      status: formData.status.selectedValue,
    });

    if (isDeleteSculpingSize === true) {
      await deleteNailSize(dataDecode.quote_id);
    }

    if (isDeleteService === true) {
      await deleteAppointmentService(dataDecode.quote_id);
    }

    if (isDeleteDesign === true) {
      await deleteAppointmentDesign(dataDecode.quote_id);
    }
    navigate("/");
  };

  const handleIsDeleteSculpingSize = (value: boolean) => {
    setIsDeleteSculpingSize(value);
  };

  const handleIsDeleteService = (value: boolean) => {
    setIsDeleteService(value);
  };

  const handleIsDeleteDesign = (value: boolean) => {
    setIsDeleteDesign(value);
  };

  return (
    <DefaultLayout site="Actualizar cita">
      <Title title="Actualizar Cita" className="title-purple" />
      <ButtonLink icon={<ChevronLeft />} text="Regresar" route="/" />
      <form onSubmit={handleSubmit}>
        <ClientInfo onChange={handleClientInfoChange} />
        <SculpingNailSize
          onChange={handleNailSizeChange}
          defaultSculpingSize={dataDecode.size_name}
          handleDelete={handleIsDeleteSculpingSize}
        />
        <ServicesSection
          onChange={handleServicesChange}
          defaultService={dataDecode.services}
          handleDelete={handleIsDeleteService}
        />
        <Design
          onChange={handleDesignChange}
          defaultDesign={dataDecode.designs}
          handleDelete={handleIsDeleteDesign}
        />
        <Statu onChange={handleStatusChange} />
        <Resume formData={formData} />
        <div className="wrapper between">
          <button className="scale" type="submit">
            Generar cita
          </button>
          <button type="reset" className="scale" onClick={resetAll}>
            Reiniciar todo
          </button>
        </div>
      </form>
    </DefaultLayout>
  );
};
export default UpdateQuote;
