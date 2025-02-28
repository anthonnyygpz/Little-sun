import { ChevronLeft } from "lucide-react";
import { Title } from "../../shared/components/title.tsx";
import { ButtonLink } from "../../shared/components/buttonLink.tsx";
import CardClientInfo from "../../shared/components/cardClientInfo/cardClientInfo.tsx";
import CardSculpingNailSize from "../../shared/components/cardSculpingNailSize/cardSculpingNailSize.tsx";
import CardService from "../../shared/components/cardService/cardService.tsx";
import CardDesign from "../../shared/components/cardDesign/cardDesign.tsx";
import CardResume from "../../shared/components/cardResume/cardResume.tsx";
import useFormSubmitAppointment from "../hooks/useFormSubmitAppointment.ts";
import DefaultLayout from "../../shared/components/defaultLayout.tsx";
import useFormState from "../hooks/useFormAppointment.ts";

function GenerateAppointment() {
  const {
    formData,
    resetAll,
    handleClientInfoChange,
    handleNailSizeChange,
    handleServicesChange,
    handleDesignChange,
  } = useFormState();

  const { handleSubmit } = useFormSubmitAppointment(formData);

  return (
    <DefaultLayout site="Generar cita">
      <Title title="Generar Citas" className="title-purple" />
      <ButtonLink icon={<ChevronLeft size={30} />} text="Regresar" route="/" />
      <form onSubmit={handleSubmit}>
        <CardClientInfo
          onChange={handleClientInfoChange}
          inputRequired={true}
        />
        <CardSculpingNailSize onChange={handleNailSizeChange} />
        <CardService onChange={handleServicesChange} />
        <CardDesign onChange={handleDesignChange} />
        <CardResume formData={formData} />
        <div className="wrapper between">
          <button className="scale" type="submit">
            Generar cita
          </button>
          <button type="reset" onClick={resetAll} className="scale">
            Reiniciar todo
          </button>
        </div>
      </form>
    </DefaultLayout>
  );
}

export default GenerateAppointment;
