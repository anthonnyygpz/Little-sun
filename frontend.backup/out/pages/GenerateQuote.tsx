import { useState } from "react";
import Tittle from "../components/Tittle.tsx";
import DefaultLayout from "../layouts/DefaultLayout.tsx";
import ClientInfo from "../sections/ClientInfo.tsx";
import SculpingNailSize from "../sections/SculpingNailSize.tsx";
import ServicesSection from "../sections/Services.tsx";
import Design from "../sections/Design.tsx";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ResumeContainer from "../sections/ResumeContainer.tsx";
import useQuotes from "../hooks/useQuotes.ts";

function GenerateQuotePage() {
  const { getQuotes, addQuote } = useQuotes();
  const [formData, setFormData] = useState({
    clientInfo: { name: "", phone: "" },
    nailSize: "",
    services: {
      options: [] as number[],
      services: { name: "", price: 0 },
    },
    designs: {
      options: [] as number[],
      designs: { name: "", price: 0 },
    },
  });

  const resetAll = () => {
    window.location.reload();
  }
  const handleClientInfoChange = (data: { name: string; phone: string }) => {
    setFormData((prev) => ({
      ...prev,
      clientInfo: data,
    }));
  };

  const handleNailSizeChange = (selectedValue: string) => {
    setFormData((prev) => ({
      ...prev,
      nailSize: selectedValue,
    }));
  };

  const handleServicesChange = (data: {
    options: number[];
    services: { name: string; price: number };
  }) => {
    setFormData((prev) => ({
      ...prev,
      services: data,
    }));
  };

  const handleDesignChange = (data: {
    options: number[];
    designs: { name: string; price: number };
  }) => {
    setFormData((prev) => ({
      ...prev,
      designs: data,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData) {
      await addQuote({ newQuote: formData });

      setFormData({
        clientInfo: { name: "", phone: "" },
        nailSize: "",
        services: {
          options: [] as number[],
          services: { name: "", price: 0 },
        },
        designs: {
          options: [] as number[],
          designs: { name: "", price: 0 },
        },
      })
      getQuotes();
      console.log("Creado")
    }
  };

  return (
    <DefaultLayout>
      <Tittle classNameProps="title-purple" children="Generar Citas" />

      <div className="wrapper between">
        <Link to="/">
          <button>
            <ChevronLeft />
          </button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <ClientInfo onChange={handleClientInfoChange} />
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
