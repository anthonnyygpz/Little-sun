import type React from "react";
import { useState } from "react";
import Button from "../button.tsx";
import { ServiceService } from "../../../service";
import { useNavigate } from "react-router-dom";

interface Servicio {
  id: number;
  name: string;
  price: number;
}

const AddServices: React.FC = () => {
  const [servicesList, setServices] = useState<Servicio[]>([
    { id: 1, name: "", price: 0 },
  ]);

  const { addServices } = ServiceService();
  const navigate = useNavigate();

  async function handleAddServices() {
    for (const service of servicesList) {
      await addServices({
        service_name: service.name,
        price: service.price,
      });
    }
    navigate("/Services");
  }

  const agregarServicio = () => {
    const nuevoId =
      servicesList.length > 0
        ? Math.max(...servicesList.map((s) => s.id)) + 1
        : 1;
    setServices([...servicesList, { id: nuevoId, name: "", price: 0 }]);
  };

  const eliminarServicio = (id: number) => {
    if (servicesList.length > 1) {
      setServices(servicesList.filter((servicio) => servicio.id !== id));
    }
  };

  const actualizarServicio = (
    id: number,
    campo: keyof Servicio,
    valor: string,
  ) => {
    setServices(
      servicesList.map((servicio) =>
        servicio.id === id ? { ...servicio, [campo]: valor } : servicio,
      ),
    );
  };

  return (
    <div className="servicios-card">
      <h2>Agregar Servicios</h2>
      <div className="servicios-lista">
        {servicesList.map((servicio) => (
          <div key={servicio.id} className="servicio-item">
            <div className="input-group">
              <label htmlFor={`nombre-${servicio.id}`}>Nombre:</label>
              <input
                id={`-${servicio.id}`}
                type="text"
                value={servicio.name}
                onChange={(e) =>
                  actualizarServicio(servicio.id, "name", e.target.value)
                }
                placeholder="Nombre del servicio"
              />
            </div>

            <div className="input-group">
              <label htmlFor={`price-${servicio.id}`}>Precio:</label>
              <input
                id={`precio-${servicio.id}`}
                type="number"
                value={servicio.price}
                onChange={(e) =>
                  actualizarServicio(servicio.id, "price", e.target.value)
                }
                placeholder="Precio del servicio"
              />
            </div>
            {servicesList.length > 1 && (
              <button
                className="eliminar-btn"
                onClick={() => eliminarServicio(servicio.id)}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="wrapper">
        <Button text="Crear otro servicio" onClick={agregarServicio} />
      </div>

      <button className="add-btn" onClick={handleAddServices}>
        Suibir datos
      </button>
    </div>
  );
};

export default AddServices;
