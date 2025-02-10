import { useState, useEffect } from "react";
import Tittle from "../components/Tittle.tsx";
import DefaultLayout from "../layouts/DefaultLayout.tsx";
import ClientInfo from "../sections/ClientInfo.tsx";
import SculpingNailSize from "../sections/SculpingNailSize.tsx";
import ServicesSection from "../sections/Services.tsx";
import Design from "../sections/Design.tsx";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ResumeContainer from "../sections/ResumeContainer.tsx";
import useQuotes from "../hooks/useQuotes.ts";
import useClients from "../hooks/useClient.ts";
import useQuoteService from "../hooks/useQuoteService.ts";
import useQuoteDesign from "../hooks/useQuoteDesign.ts";

function GenerateQuotePage() {
  const { addQuote } = useQuotes();
  const { getByNameClient, addClient } = useClients();
  const { addQuoteService } = useQuoteService();
  const { addQuoteDesign } = useQuoteDesign();

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
  });

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
    });
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData) {
      let clientId = 0;
      let quoteId = 0;
      const getClientIfExists = await getByNameClient(formData.clientInfo.name);

      if (getClientIfExists) {
        console.log("Entro en el primer if")
        clientId = getClientIfExists["client_id"];
      } else {

        console.log("Entro en el segundo if")
        const createClient = await addClient({
          name: formData.clientInfo.name,
          phone_number: formData.clientInfo.phone
        })
        clientId = createClient?.client_id;
      }

      const createQuotes = await addQuote({
        client_id: clientId,
        nail_size_id: formData.nailSize.id,
        total_amount: formData.totalPrice,
      });
      quoteId = createQuotes.quote_id;
      for (const id of formData.services.options) {
        await addQuoteService({ quote_id: quoteId, service_id: id })
      }

      for (const id of formData.designs.options) {
        await addQuoteDesign({ quote_id: quoteId, design_id: id });
      }
      navigate("/");
    }
  };

  return (
    <DefaultLayout>
      <Tittle classNameProps="title-purple" text="Generar Citas" />

      <div className="wrapper between">
        <Link to="/">
          <button>
            <ChevronLeft />
          </button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <ClientInfo onChange={handleClientInfoChange} is_required={true} />
        <SculpingNailSize onChange={handleNailSizeChange} />
        <ServicesSection onChange={handleServicesChange} />
        <Design onChange={handleDesignChange} />
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
  );
}

export default GenerateQuotePage;
