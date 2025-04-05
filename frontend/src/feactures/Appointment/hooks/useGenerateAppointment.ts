import { FormEvent, useCallback, useMemo, useState } from "react";
import { Form } from "../../../types/form.types.ts";
import { useNavigate } from "react-router";
import { appointmentService } from "../../../api/appointmentService.ts";
import { useAuth } from "../../../contexts/AuthContext/hooks/useAuth.ts";
import { TOAST_MESSAGE } from "../../../constants/toast.ts";
import { ROUTE_PATHS } from "../../../constants/routes.ts";
import toast from "react-hot-toast";

export const useGenerateAppointment = () => {
  const [formData, setFormData] = useState<Form>({
    client: { name: "", phone: "" },
    sculpingNailSize: { size_id: 0, nailLength: "", price: 0 },
    nailService: { ids: [], nailServiceData: [] },
    nailDesign: { ids: [], nailDesignData: [] },
    dateAndTime: { date: "", time: "" },
  });
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (
        !formData.client.name ||
        !formData.dateAndTime.time ||
        !formData.dateAndTime.date
      ) {
        toast.error("Se requiere rellenar algunos datos.");
        return;
      }

      if (isAuthenticated && token) {
        try {
          const appointmentPromise = appointmentService.createAppointment(
            token,
            {
              client_name: formData.client.name,
              phone_number: formData.client.phone,
              nail_size_id: formData.sculpingNailSize.size_id,
              nail_designs: formData.nailDesign.ids,
              nail_services: formData.nailService.ids,
              date_appointment: formData.dateAndTime.date,
              appointment_time: formData.dateAndTime.time,
            },
          );
          await toast.promise(appointmentPromise, {
            loading: TOAST_MESSAGE.LOADING_CREATE,
            success: TOAST_MESSAGE.SUCCESS_CREATE,
            error: TOAST_MESSAGE.ERROR_CREATE,
          });
          navigate(ROUTE_PATHS.APPOINTMENTS);
        } catch (error) {
          console.error(String(error));
        }
      }
    },
    [formData, navigate, isAuthenticated, token],
  );

  const handleUncheckAll = useCallback(() => {
    window.location.reload();
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

  return {
    handleSubmit,
    formData,
    setFormData,
    handleUncheckAll,
    calculateTotal,
  };
};
