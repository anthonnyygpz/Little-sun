import type React from "react";
import { useState } from "react";
import Button from "../components/Buttons/button.tsx";
import { useNavigate } from "react-router-dom";
import useDesignApi from "../hooks/useDesignApi.tsx";

interface Design {
  id: number;
  name: string;
  price: number;
}

const AddDesignSection: React.FC = () => {
  const [designList, setDesigns] = useState<Design[]>([
    { id: 1, name: "", price: 0 },
  ]);

  const { AddDesigns } = useDesignApi();
  const navigate = useNavigate();

  async function handleAddDesgin() {
    for (const design of designList) {
      await AddDesigns({
        design_name: design.name,
        price: design.price,
      });
    }
    navigate("/Designs");
  }

  const addDesign = () => {
    const nuevoId =
      designList.length > 0 ? Math.max(...designList.map((s) => s.id)) + 1 : 1;
    setDesigns([...designList, { id: nuevoId, name: "", price: 0 }]);
  };

  const deleteDesign = (id: number) => {
    if (designList.length > 1) {
      setDesigns(designList.filter((design) => design.id !== id));
    }
  };

  const updateDesign = (id: number, campo: keyof Design, valor: string) => {
    setDesigns(
      designList.map((design) =>
        design.id === id ? { ...design, [campo]: valor } : design,
      ),
    );
  };

  return (
    <div className="servicios-card">
      <h2>Agregar Servicios</h2>
      <div className="servicios-lista">
        {designList.map((design) => (
          <div key={design.id} className="servicio-item">
            <div className="input-group">
              <label htmlFor={`name-${design.id}`}>Nombre:</label>
              <input
                id={`-${design.id}`}
                type="text"
                value={design.name}
                onChange={(e) =>
                  updateDesign(design.id, "name", e.target.value)
                }
                placeholder="Nombre del diseño"
              />
            </div>

            <div className="input-group">
              <label htmlFor={`price-${design.id}`}>Precio:</label>
              <input
                id={`price-${design.id}`}
                type="number"
                value={design.price}
                onChange={(e) =>
                  updateDesign(design.id, "price", e.target.value)
                }
                placeholder="Precio del diseño"
              />
            </div>
            {designList.length > 1 && (
              <button
                className="eliminar-btn"
                onClick={() => deleteDesign(design.id)}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="wrapper">
        <Button text="Crear otro diseño" onClick={addDesign} />
      </div>

      <button className="add-btn" onClick={handleAddDesgin}>
        Suibir datos
      </button>
    </div>
  );
};

export default AddDesignSection;
