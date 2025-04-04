import { FormEvent, useCallback, useMemo, useState } from "react";
import { Form } from "../../../types/form.types.ts";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../../constants/routes.ts";
import { toast } from "react-toastify";
import { appointmentService } from "../../../api/appointmentService.ts";
import { useAuth } from "../../../contexts/AuthContext/hooks/useAuth.ts";

export const useGenerateAppointment = () => {
  const [formData, setFormData] = useState<Form>({});
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!formData.client?.name) {
        return;
      }
      try {
        if (isAuthenticated && token) {
          await toast.promise(
            appointmentService.createAppointment(token, {
              client_name: formData.client.name,
              phone_number: formData.client.phone,
              nail_size_id: formData.sculpingNailSize?.size_id || 0,
              nail_designs: formData.nailDesign?.ids || [],
              nail_services: formData.nailService?.ids || [],
              date_appointment: "2025-04-08",
              appointment_time: "12:02",
            }),
            {
              pending: "Subiendo Datos.",
              success: "Datos subidos exitosamente.",
              error: "Error al subir los datos.",
            },
          );
          navigate(ROUTE_PATHS.APPOINTMENTS);
        }
      } catch (error) {
        console.error("Error intentar crear la cita: ", error);
      }
    },
    [formData, isAuthenticated, token],
  );

  const handleUncheckAll = useCallback(() => {
    setFormData({
      client: undefined,
      sculpingNailSize: undefined,
      nailService: undefined,
      nailDesign: undefined,
      dateAndTime: undefined,
    });
  }, []);

  const calculateTotal = useMemo(() => {
    let total = 0;

    // Sumar el precio de sculpingNailSize si existe
    if (formData.sculpingNailSize?.price) {
      total += formData.sculpingNailSize.price;
    }

    // Sumar precios de los servicios seleccionados
    if (formData.nailService?.nailServiceData) {
      Object.values(formData.nailService.nailServiceData).forEach((service) => {
        if (service?.price) {
          total += service.price;
        }
      });
    }

    // Sumar precios de los diseños seleccionados
    if (formData.nailDesign?.nailDesignData) {
      Object.values(formData.nailDesign.nailDesignData).forEach((design) => {
        if (design?.price) {
          total += design.price;
        }
      });
    }

    return total;
  }, [formData]);

  // Apis
  // Crear cita

  return {
    handleSubmit,
    formData,
    setFormData,
    handleUncheckAll,
    calculateTotal,
  };
};
