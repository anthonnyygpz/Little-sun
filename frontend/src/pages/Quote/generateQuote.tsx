import { ChevronLeft } from "lucide-react";
import DefaultLayout from "../../layouts/defaultLayout.tsx";
import { Title } from "../../components/title.tsx";
import { ButtonLink } from "../../components/Buttons/buttonLink.tsx";
import ClientInfo from "../../sections/clientInfo.tsx";
import SculpingNailSize from "../../sections/sculpingNailSize.tsx";
import Services from "../../sections/services.tsx";
import Design from "../../sections/design.tsx";
import Resume from "../../sections/resume.tsx";
import useFormQuote from "../../hooks/useFormQuote.ts";
import useFormSubmitQuote from "../../hooks/useFormSubmitQuote.ts";

function GenerateQuotePage() {
  const {
    formData,
    resetAll,
    handleClientInfoChange,
    handleNailSizeChange,
    handleServicesChange,
    handleDesignChange,
  } = useFormQuote();

  const { handleSubmit } = useFormSubmitQuote(formData);

  return (
    <DefaultLayout site="Generar cita">
      <Title title="Generar Citas" className="title-purple" />
      <ButtonLink icon={<ChevronLeft size={30} />} text="Regresar" route="/" />
      <form onSubmit={handleSubmit}>
        <ClientInfo onChange={handleClientInfoChange} inputRequired={true} />
        <SculpingNailSize onChange={handleNailSizeChange} />
        <Services onChange={handleServicesChange} />
        <Design onChange={handleDesignChange} />
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
}

export default GenerateQuotePage;
