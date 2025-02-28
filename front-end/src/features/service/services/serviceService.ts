import { useEffect, useState } from "react";
import {
  addServiceApi,
  getAllServicesApi,
  updateServiceApi,
  deleteServiceApi,
} from "../../../lib/enpoints/servicesApi.ts";
import {
  ServiceCreate,
  ServiceResponse,
  ServiceUpdate,
} from "../../shared/types/serviceTypes.ts";

const ServiceService = () => {
  const [services, setServices] = useState<ServiceResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const addServices = async (
    newServices: ServiceCreate,
  ): Promise<ServiceCreate> => {
    try {
      const data = await addServiceApi(newServices);
      sessionStorage.removeItem("services");
      getAllServicesApi();
      return data;
    } catch (error) {
      console.error("Error adding service:", error);
      throw error;
    }
  };

  const getAllServices = async () => {
    const cacheSize = sessionStorage.getItem("services");
    if (cacheSize) {
      setServices(JSON.parse(cacheSize));
      setLoading(false);
    } else {
      const getServices = async () => {
        try {
          const data = await getAllServicesApi();
          sessionStorage.setItem("services", JSON.stringify(data));
          setServices(Object(data));
        } catch (error) {
          setError("Failded to fetch services");
          console.error("Error fetching services:", error);
        } finally {
          setLoading(false);
        }
      };
      getServices();
    }
  };

  const updateServices = async (
    editServices: ServiceUpdate,
  ): Promise<ServiceResponse> => {
    try {
      const data = await updateServiceApi(editServices);
      sessionStorage.removeItem("services");
      getAllServicesApi();
      return data;
    } catch (error) {
      console.error("Error updating service:", error);
      throw error; // Opcional: puedes relanzar el e
    }
  };

  const deleteServices = async (id: number) => {
    try {
      const data = await deleteServiceApi(id);
      sessionStorage.removeItem("services");
      getAllServicesApi();
      return data;
    } catch (error) {
      console.error("Error deleting service:", error);
      throw error; // Opcional: puedes relanzar el error si necesitas manejarlo en otro lugar
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);
  return {
    services,
    loading,
    error,
    addServices,
    getAllServices,
    updateServices,
    deleteServices,
  };
};

export default ServiceService;
