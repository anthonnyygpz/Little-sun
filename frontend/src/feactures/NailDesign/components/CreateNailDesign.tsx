import { Plus } from "lucide-react";
import { Button } from "../../../components/common/Button";
import { Input } from "../../../components/common/Input";
import { SubTitle } from "../../../components/common/SubTitle";
import { useCreateNailDesign } from "../hooks/useCreateNailDesign";

export const CreateNailDesign = () => {
  const {
    nailDesigns,
    addNailDesign,
    updateNailDesign,
    deleteNailDesign,
    handleUploadData,
  } = useCreateNailDesign();

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-lg shadow-md p-5 w-4xl">
        <SubTitle>Agregar Diseño</SubTitle>
        <div className="flex flex-col gap-2">
          {nailDesigns.map((nailDesign) => (
            <div
              key={nailDesign.id}
              className="bg-gray-50 border border-gray-200 p-6"
            >
              <div className="mb-4">
                <Input
                  onChange={(e) =>
                    updateNailDesign(nailDesign.id, "name", e.target.value)
                  }
                  placeholder="Nombre del diseño"
                  name={`name-${nailDesign.name}`}
                  value={nailDesign.name}
                  label="Nombre"
                  type="text"
                  required
                />
              </div>

              <div className="mb-[15px]">
                <Input
                  className="[appearance:textfield] [-moz-appearance:textfield]"
                  onChange={(e) =>
                    updateNailDesign(nailDesign.id, "price", e.target.value)
                  }
                  placeholder="Precio del servicio"
                  name={`price-${nailDesign.id}`}
                  value={String(nailDesign.price)}
                  label="Precio Base"
                  type="number"
                  required
                />
              </div>
              {nailDesigns.length > 1 && (
                <Button
                  className="relative  btn-red rounded-md py-2 px-5 cursor-pointer"
                  onClick={() => deleteNailDesign(nailDesign.id)}
                >
                  Eliminar
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center mt-[20px] gap-4">
          <Button
            onClick={addNailDesign}
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
