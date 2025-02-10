import { useState, useEffect } from "react";
import Tittle from "../components/Tittle.tsx";
import DefaultLayout from "../layouts/DefaultLayout.tsx";
import ClientInfo from "../sections/ClientInfo.tsx";
import SculpingNailSize from "../sections/SculpingNailSize.tsx";
import ServicesSection from "../sections/Services.tsx";
import Design from "../sections/Design.tsx";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ResumeContainer from "../sections/ResumeContainer.tsx";
import { deleteSculping, updateQuote } from "../api/enpoints/quoteApi.ts";
import Status from "../sections/Status.tsx";
import { decode } from 'js-base64';
import { deleteQuoteService } from "../api/enpoints/quoteServiceApi.ts";
import { deleteQuoteDesign } from "../api/enpoints/quoteDesignApi.ts";

function UpdateQuote() {
  const { data } = useParams();
  const dataDecode = JSON.parse(decode(data));

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

  const [isDeleteSculpingSize, setIsDeleteSculpingSize] = useState<boolean>()
  const [isDeleteService, setIsDeleteService] = useState<boolean>()
  const [isDeleteDesign, setIsDeleteDesign] = useState<boolean>()


  // Función para calcular el precio total
  const calculateTotalPrice = () => {
    let totalPriceServices = 0;
    let totalPriceDesigns = 0;

    // Sumar precios de servicios
    if (formData.services.services && formData.services.services.length > 0) {
      totalPriceServices = formData.services.services.reduce(
        (acc, service) => acc + service.price,
        0
      );
    }

    // Sumar precios de diseños
    if (formData.designs.designs && formData.designs.designs.length > 0) {
      totalPriceDesigns = formData.designs.designs.reduce(
        (acc, design) => acc + design.price,
        0
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
      nailSize: { selectedValue: "", id: 0 },
      services: {
        options: [] as number[],
        services: [] as { name: string; price: number }[],
      },
      designs: {
        options: [] as number[],
        designs: [] as { name: string; price: number }[],
      },
      totalPrice: 0,
      status: { selectedValue: "", id: 0 }
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

  const handleNailSizeChange = (data: { selectedValue: string, id: number }) => {
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

  const handleStatusChange = (data: { selectedValue: "", id: 0 }) => {
    setFormData((prev) => ({
      ...prev,
      status: data
    }));
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await updateQuote({
      quote_id: dataDecode.quote_id,
      client_id: dataDecode.client_id,
      nail_size_id: formData.nailSize.id,
      name: formData.clientInfo.name,
      phone_number: formData.clientInfo.phone,
      total_amount: formData.totalPrice,
      designs: formData.designs.options,
      services: formData.services.options,
      status: formData.status.selectedValue,
    })
    if (isDeleteSculpingSize === true) {
      await deleteSculping(dataDecode.quote_id);
    }

    if (isDeleteService === true) {
      await deleteQuoteService(dataDecode.quote_id);

    }

    if (isDeleteDesign === true) {
      await deleteQuoteDesign(dataDecode.quote_id);
    }
    navigate("/");
  };

  const handleIsDeleteSculpingSize = (value: boolean) => {
    setIsDeleteSculpingSize(value);
  }

  const handleIsDeleteService = (value: boolean) => {
    setIsDeleteService(value);
  }

  const handleIsDeleteDesign = (value: boolean) => {
    setIsDeleteDesign(value);
  }

  return <DefaultLayout>
    <Tittle classNameProps="title-purple" text="Actualizar Cita" />
    <div className="wrapper between">
      <Link to="/">
        <button>
          <ChevronLeft />
        </button>
      </Link>
    </div>
    <form onSubmit={handleSubmit}>
      <ClientInfo onChange={handleClientInfoChange} is_required={false} />
      <SculpingNailSize onChange={handleNailSizeChange} defaultSculpingSize={dataDecode.size_name} is_delete={handleIsDeleteSculpingSize} />
      <ServicesSection onChange={handleServicesChange} defaultService={dataDecode.services} is_delete={handleIsDeleteService} />
      <Design onChange={handleDesignChange} defaultDesign={dataDecode.designs} is_delete={handleIsDeleteDesign} />
      <Status onChange={handleStatusChange} />
      <ResumeContainer formData={formData} />
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
}
export default UpdateQuote;
