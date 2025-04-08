import { Input } from "../../../components/common/Input";
import { SubTitle } from "../../../components/common/SubTitle";
import { useSculpingNailSize } from "../hooks/useCreateSculpingNailSize";
import { Button } from "../../../components/common/Button";
import { Plus } from "lucide-react";

export const CreateSculpingNailSize = () => {
  const {
    sulpingNailSizes,
    updateSculpingNailSize,
    deleteSculpingNailSize,
    addSculpingNailSize,
    handleUploadData,
  } = useSculpingNailSize();
  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-lg shadow-md p-5 w-4xl">
        <SubTitle>Agregar Servicios</SubTitle>
        <div className="flex flex-col gap-2">
          {sulpingNailSizes.map((sculping) => (
            <div
              className="bg-gray-50 border border-gray-200 p-6"
              key={sculping.id}
            >
              <div className="mb-4">
                <Input
                  onChange={(e) =>
                    updateSculpingNailSize(sculping.id, "name", e.target.value)
                  }
                  placeholder="Nombre del servicio"
                  name={`name-${sculping.id}`}
                  value={sculping.name}
                  label="Nombre"
                  type="text"
                />
              </div>

              <div className="mb-[15px]">
                <Input
                  className="[appearance:textfield] [-moz-appearance:textfield]"
                  onChange={(e) =>
                    updateSculpingNailSize(sculping.id, "price", e.target.value)
                  }
                  placeholder="Precio del servicio"
                  name={`price-${sculping.id}`}
                  value={String(sculping.price)}
                  label="Precio Base"
                  type="number"
                />
              </div>

              {sulpingNailSizes.length > 1 && (
                <Button
                  className="relative  btn-red rounded-md py-2 px-5 cursor-pointer"
                  onClick={() => deleteSculpingNailSize(sculping.id)}
                >
                  Eliminar
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center mt-[20px] gap-4">
          <Button
            onClick={addSculpingNailSize}
            className="flex items-center justify-center"
          >
            <Plus />
            <span>Crear otro esculpido</span>
          </Button>
          <Button onClick={handleUploadData}>Subir datos</Button>
        </div>
      </div>
    </div>
  );
};
