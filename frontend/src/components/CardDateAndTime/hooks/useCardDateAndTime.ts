import { ChangeEvent, useCallback, useState } from "react";
import { DateAndTime } from "../../../types/dateAndTime.types";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface useCardDateAndTimeProps {
  onChange: (data: DateAndTime) => void;
}

export const useCardDateAndTime = ({ onChange }: useCardDateAndTimeProps) => {
  const [checkAppointment, setCheckAppointment] = useState<boolean>(false);
  const [formData, setFormData] = useState<DateAndTime>({
    date: "",
    time: "",
  });

  // manejo de cambios de checkbox
  const handleCheckbox = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setCheckAppointment(checked);

    const dateNow = new Date();
    if (checked) {
      setFormData({
        date: format(dateNow, "yyyy-MM-dd", { locale: es }),
        time: format(dateNow, "HH,mm", { locale: es }),
      });
      onChange({
        date: format(dateNow, "yyyy-MM-dd", { locale: es }),
        time: format(dateNow, "HH:mm", { locale: es }),
      });
    } else {
      handleUncheckAll();
    }
  }, []);

  // Manejo de cambios de los inputs
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const updatedForm = { ...formData, [name]: value };
      setFormData(updatedForm);
      onChange(updatedForm);
    },
    [formData, onChange],
  );

  // Borrar contenido de fecha y hora
  const handleUncheckAll = () => {
    setFormData({ date: "", time: "" });
    onChange({ date: "", time: "" });
  };

  return {
    checkAppointment,
    setCheckAppointment,
    formData,
    handleInputChange,
    handleUncheckAll,
    handleCheckbox,
  };
};
