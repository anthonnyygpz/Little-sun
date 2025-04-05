import { Plus } from "lucide-react";
import { Button } from "../../../components/common/Button";
import { Input } from "../../../components/common/Input";
import { SubTitle } from "../../../components/common/SubTitle";
import { useCreateNailService } from "../hooks/useCreateNailService";

export const CreateNailService = () => {
  const {
    nailServices,
    updateNailService,
    deleteNailService,
    addNailService,
    handleUploadData,
  } = useCreateNailService();

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-lg shadow-md p-5 w-4xl">
        <SubTitle>Agregar Servicios</SubTitle>
        <div className="flex flex-col gap-2">
          {nailServices.map((nailService) => (
            <div
              className="bg-gray-50 border border-gray-200 p-6"
              key={nailService.id}
            >
              <div className="mb-4">
                <Input
                  onChange={(e) =>
                    updateNailService(nailService.id, "name", e.target.value)
                  }
                  placeholder="Nombre del servicio"
                  name={`name-${nailService.id}`}
                  value={nailService.name}
                  label="Nombre"
                  type="text"
                />
              </div>

              <div className="mb-[15px]">
                <Input
                  className="[appearance:textfield] [-moz-appearance:textfield]"
                  onChange={(e) =>
                    updateNailService(nailService.id, "price", e.target.value)
                  }
                  placeholder="Precio del servicio"
                  name={`price-${nailService.id}`}
                  value={String(nailService.price)}
                  label="Precio Base"
                  type="number"
                />
              </div>

              {nailServices.length > 1 && (
                <Button
                  className="relative  btn-red rounded-md py-2 px-5 cursor-pointer"
                  onClick={() => deleteNailService(nailService.id)}
                >
                  Eliminar
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center mt-[20px] gap-4">
          <Button
            onClick={addNailService}
            className="flex items-center justify-center"
          >
            <Plus />
            <span>Crear otro servicio</span>
          </Button>
          <Button onClick={handleUploadData}>Subir datos</Button>
        </div>
      </div>
    </div>
  );
};
