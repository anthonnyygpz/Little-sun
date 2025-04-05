import { ChevronLeft } from "lucide-react";
import { CardClientInfo } from "../../../components/CardClientInfo/CardClientInfo";
import { CardDateAndTime } from "../../../components/CardDateAndTime/CardDateAndTime";
import { CardNailDesign } from "../../../components/CardNailDesign/CardNailDesign";
import { CardNailService } from "../../../components/CardNailService/CardNailService";
import { CardSculpingNailSize } from "../../../components/CardSculpingNailSize/CardScupingNailSize";
import { Button } from "../../../components/common/Button";
import { Label } from "../../../components/common/Label";
import { SubTitle } from "../../../components/common/SubTitle";
import { Title } from "../../../components/common/Title";
import { ROUTE_PATHS } from "../../../constants/routes";
import { useGenerateAppointment } from "../hooks/useGenerateAppointment";

export const GenerateAppointment = () => {
  const {
    formData,
    calculateTotal,
    handleUncheckAll,
    handleSubmit,
    setFormData,
  } = useGenerateAppointment();

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-white">
        {/* Main Content */}
        <div className="mx-auto max-w-6xl p-6">
          <div className="flex items-center gap-1">
            <Button
              href={ROUTE_PATHS.APPOINTMENTS}
              className="mb-8 rounded-full bg-purple-400 p-1 text-white transition-colors hover:bg-purple-500 active:bg-purple-200 active:text-purple-400"
            >
              <ChevronLeft />
            </Button>
            <Title>Reservar Cita</Title>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              {/* Client Information */}
              <CardClientInfo
                onChange={(data) => {
                  setFormData((prev) => ({ ...prev, client: data }));
                }}
              />
              {/* Date and Time */}
              <CardDateAndTime
                onChange={(data) => {
                  setFormData((prev) => ({ ...prev, dateAndTime: data }));
                }}
              />
            </div>
            <div>
              {/* Service Options */}
              <div className="mb-8 rounded-lg bg-gray-50 p-6 shadow-sm">
                <SubTitle>Servicios</SubTitle>
                <div className="mb-6">
                  <Label>Tamaño de Uñas</Label>
                  <CardSculpingNailSize
                    onChange={(data) => {
                      setFormData((prev) => ({
                        ...prev,
                        sculpingNailSize: data,
                      }));
                    }}
                  />
                </div>

                <div className="mb-6">
                  <Label>Servicios Principales</Label>
                </div>
                <CardNailService
                  onChange={(data) => {
                    setFormData((prev) => ({ ...prev, nailService: data }));
                  }}
                />

                <div>
                  <Label>Diseños</Label>
                  <CardNailDesign
                    onChange={(data) => {
                      setFormData((prev) => ({ ...prev, nailDesign: data }));
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Summary and Actions */}
          <div className="mt-8">
            <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
              <div className="mb-4 flex flex-wrap items-center justify-between border-b border-gray-200 pb-4">
                <SubTitle className="mb-0 border-none pb-0">
                  Resumen de la Cita
                </SubTitle>
                <div className="flex items-center rounded-full bg-purple-100 px-4 py-2">
                  <span className="font-medium text-purple-800">Total:</span>
                  <span className="ml-2 text-xl font-bold text-purple-700">
                    {calculateTotal}
                  </span>
                </div>
              </div>

              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {formData.client?.name && (
                  <div className="rounded-md bg-white p-3">
                    <span className="text-sm text-gray-500">Cliente:</span>
                    <p className="font-medium text-gray-800">
                      {formData.client.name}
                    </p>
                  </div>
                )}

                {formData.client?.phone && (
                  <div className="rounded-md bg-white p-3">
                    <span className="text-sm text-gray-500">Teléfono:</span>
                    <p className="font-medium text-gray-800">
                      {formData.client.phone}
                    </p>
                  </div>
                )}

                {(formData.dateAndTime?.date || formData.dateAndTime?.time) && (
                  <div className="rounded-md bg-white p-3">
                    <span className="text-sm text-gray-500">Fecha y hora:</span>
                    <p className="font-medium text-gray-800">
                      {formData.dateAndTime.date}{" "}
                      {formData.dateAndTime.time &&
                        `a las ${formData.dateAndTime.time}`}
                    </p>
                  </div>
                )}

                {formData.sculpingNailSize?.nailLength && (
                  <div className="rounded-md bg-white p-3">
                    <span className="text-sm text-gray-500">
                      Tamaño de uña:
                    </span>
                    <p className="font-medium text-gray-800">
                      {formData.sculpingNailSize.nailLength}
                    </p>
                  </div>
                )}

                <div className="rounded-md bg-white p-3">
                  <span className="text-sm text-gray-500">Servicios:</span>
                  <p className="font-medium text-gray-800">
                    {formData.nailService?.nailServiceData.map(
                      (nailService) => `${nailService.service_name} , `,
                    )}

                    {formData.nailDesign?.nailDesignData.map(
                      (nailDesign) => `${nailDesign.design_name} ,`,
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  className="btn-purple cursor-pointer rounded-full px-8 py-3 font-medium shadow-md"
                  onClick={handleSubmit}
                  type="submit"
                >
                  Confirmar Cita
                </button>

                <button
                  className="cursor-pointer rounded-full border border-gray-300 bg-white px-8 py-3 text-gray-700 transition-colors hover:bg-gray-100"
                  onClick={handleUncheckAll}
                  type="reset"
                >
                  Reiniciar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
