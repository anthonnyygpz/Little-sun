import { useNavigate } from "react-router-dom";
import { AppointmentService } from "../";
import { FormEvent } from "react";
import { FormData } from "../../shared/types/formDataTypes.ts";
import Swal from "sweetalert2";

const useFormSubmitAppointment = (formData: FormData) => {
  const { addAppointment } = AppointmentService();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!formData.clientInfo.name) {
      alert("Falta datos por rellenar");
      Swal.fire({
        icon: "error",
        title: "Faltan datos por rellenar.",
      });
      return;
    }
    if (formData) {
      await addAppointment({
        client_name: formData.clientInfo.name,
        nail_size_id: formData.nailSize.id,
        phone_number: String(formData.clientInfo.phone),
        nail_designs: formData.designs.options,
        nail_services: formData.services.options,
        user_id: 1,
      });
      navigate("/");
    }
  };

  return { handleSubmit };
};

export default useFormSubmitAppointment;
