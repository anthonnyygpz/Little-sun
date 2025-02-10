import { useEffect, useState } from "react";
import { fetchServices } from "../api/enpoints/servicesApi.ts";
import { Services } from "../models/Services.models.ts";

const useServices = () => {
  const [services, setServices] = useState<Services[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cacheSize = sessionStorage.getItem("services");
    if (cacheSize) {
      setServices(JSON.parse(cacheSize));
      setLoading(false);
    } else {
      const getServices = async () => {
        try {
          const data = await fetchServices();
          sessionStorage.setItem("services", JSON.stringify(data));
          setServices(data);
        } catch {
          setError("Failded to fetch services");
        } finally {
          setLoading(false);
        }
      };
      getServices();
    }
  }, []);
  return { services, loading, error };
};

export default useServices;
