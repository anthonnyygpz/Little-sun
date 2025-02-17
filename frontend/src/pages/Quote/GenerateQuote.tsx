import { ChevronLeft } from "lucide-react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { Title } from "../../components/Title";
import { ButtonLink } from "../../components/Buttons/ButtonLink";
import ClientInfo from "../../sections/ClientInfo";
import SculpingNailSize from "../../sections/SculpingNailSize";
import Services from "../../sections/Services";
import Design from "../../sections/Design";
import Resume from "../../sections/Resume";
import useFormQuote from "../../hooks/useFormQuote";
import useFormSubmitQuote from "../../hooks/useFormSubmitQuote";

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
    <DefaultLayout>
      <Title title="Generar Citas" className="title-purple" />

      <ButtonLink icon={<ChevronLeft size={31} />} text="Regresar" route="/" />
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
