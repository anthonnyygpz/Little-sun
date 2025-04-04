import {
  Check,
  ChevronLeft,
  Phone,
  Scissors,
  SeparatorHorizontal,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { Title } from "../../shared/components/title.tsx";
import { ButtonLink } from "../../shared/components/buttonLink.tsx";
import CardClientInfo from "../../shared/components/cardClientInfo/cardClientInfo.tsx";
import CardSculpingNailSize from "../../shared/components/cardSculpingNailSize/cardSculpingNailSize.tsx";
import CardNailService from "../../shared/components/cardNailService/cardNailService.tsx";
import CardNailDesign from "../../shared/components/cardNailDesign/cardNailDesign.tsx";
import useFormSubmitAppointment from "../hooks/useFormSubmitAppointment.ts";
import DefaultLayout from "../../shared/components/defaultLayout.tsx";
import useFormState from "../hooks/useFormAppointment.ts";
import Button from "../../shared/components/button.tsx";

function GenerateAppointment() {
  const {
    formData,
    resetAll,
    handleClientInfoChange,
    handleNailSizeChange,
    handleServicesChange,
    handleDesignChange,
    totalServices,
    totalDesigns,
    isModalOpen,
    setIsModalOpen,
  } = useFormState();

  const { handleSubmit } = useFormSubmitAppointment(formData);

  return (
    <DefaultLayout site="Generar cita">
      <Title title="Generar Citas" />
      <div className="px-2 sm:px-6 lg:px-4">
        <ButtonLink
          icon={<ChevronLeft size={28} />}
          text="Regresar"
          route="/"
        />
        <form onSubmit={handleSubmit}>
          <div className="space-y-0 max-auto">
            <CardClientInfo
              onChange={handleClientInfoChange}
              inputRequired={true}
            />
            <CardSculpingNailSize onChange={handleNailSizeChange} />
            <CardNailService onChange={handleServicesChange} />
            <CardNailDesign onChange={handleDesignChange} />

            <div className="flex flex-col sm:flex-row justify-center p-6 gap-4 sm:gap-6">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto"
              >
                Generar cita
              </Button>
              <Button
                onClick={resetAll}
                type="reset"
                className="w-full sm:w-auto"
              >
                Reiniciar todo
              </Button>
            </div>
          </div>

          <div className="container mx-auto p-4">
            {isModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="relative w-full max-w-md sm:maxw-lg animate-in fade-in zoom-in duration-300">
                  <div className="w-full shadow-lg p-6 bg-white rounded-lg flex-col max-h-[90vh] overflow-y-auto flex-1">
                    <div className="relative">
                      <button
                        type="button"
                        className="absolute right-2 top-2"
                        onClick={() => setIsModalOpen(false)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <h2 className="text-xl font-semibold text-center">
                        Resumen de cita
                      </h2>
                    </div>

                    <div className="border border-gray-300" />

                    <div className="pt-6 space-y-6">
                      {/* Client Information */}
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold">
                          Información del Cliente
                        </h3>
                        <div className="grid grid-cols-[20px_1fr] gap-x-2 items-center">
                          <span className="text-muted-foreground">
                            <User />
                          </span>
                          <span>{formData.clientInfo.name}</span>
                        </div>
                        <div className="grid grid-cols-[20px_1fr] gap-x-2 items-center">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{formData.clientInfo.phone}</span>
                        </div>
                      </div>

                      <div className="border border-gray-300" />

                      {/* Services */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Scissors className="h-4 w-4 text-primary" />
                          <h3 className="text-lg font-bold">
                            Servicios de Uñas
                          </h3>
                        </div>

                        <div className="h-[100px]">
                          <div className="space-y-1">
                            {formData.services.services.map((service) => (
                              <div
                                key={service.name}
                                className="flex justify-between text-sm"
                              >
                                <span>{service.name}</span>
                                <span className="font-medium">
                                  $ {service.price.toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between text-sm pt-2">
                          <span className="font-medium">
                            Subtotal Servicios
                          </span>
                          <span className="font-medium">$ {totalServices}</span>
                        </div>
                      </div>

                      <SeparatorHorizontal />

                      {/* Designs */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <h3 className="text-lg font-bold">Diseños de Uñas</h3>
                        </div>

                        <div className="h-[80px]">
                          <div className="space-y-1">
                            {formData.designs.designs.map((design) => (
                              <div
                                key={design.name}
                                className="flex justify-between text-sm"
                              >
                                <span>{design.name}</span>
                                <span className="font-medium">
                                  $ {design.price.toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between text-sm pt-2">
                          <span className="font-medium">Subtotal Diseños</span>
                          <span className="font-medium">$ {totalDesigns}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 py-4">
                      <div className="bg-gray-200 w-full flex justify-between py-3 px-4 rounded-md">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-lg font-bold">
                          $ {formData.totalPrice.toFixed(2)}
                        </span>
                      </div>

                      <div className="w-full">
                        <p className="text-center mb-3 text-muted-foreground text-sm sm:text-base">
                          ¿Son correctos los datos?
                        </p>

                        {/* {handleSubmit ? <p className="text-red-600"></p> : ""} */}
                        <div className="flex felx-col sm:flex-row gap-3 justify-center">
                          <button
                            onClick={() => setIsModalOpen(false)}
                            className="w-full sm:w-1/2 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50  cursor-pointer"
                          >
                            <X className="mr-2 h-4 w-4" />
                            Editar
                          </button>
                          <button
                            onClick={handleSubmit}
                            className="w-full sm:w-1/2 flex items-center justify-center px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-800 cursor-pointer"
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Confirmar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
}

export default GenerateAppointment;
