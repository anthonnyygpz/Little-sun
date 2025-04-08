import { Calendar, Clock } from "lucide-react";
import { DateAndTime } from "../../types/dateAndTime.types";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { Label } from "../common/Label";
import { SubTitle } from "../common/SubTitle";
import { useCardDateAndTime } from "./hooks/useCardDateAndTime";

interface CardDateAndTimeProps {
  onChange: (data: DateAndTime) => void;
}

export const CardDateAndTime: React.FC<CardDateAndTimeProps> = ({
  onChange,
}) => {
  const {
    checkAppointment,
    formData,
    handleInputChange,
    handleUncheckAll,
    handleCheckbox,
  } = useCardDateAndTime({
    onChange,
  });

  return (
    <div className="mb-8">
      <SubTitle>Fecha y Hora</SubTitle>

      <div className="flex justify-center items-center w-full mb-4">
        <Label
          className="mb-0 text-xl border border-gray-200 hover:border-purple-400 transition-colors rounded-lg p-2 cursor-pointer"
          htmlFor="checkAppointment"
        >
          <input
            className="p-0 w-6 accent-purple-500 border border-purple-200"
            onChange={handleCheckbox}
            checked={checkAppointment}
            name="checkAppointment"
            id="checkAppointment"
            type="checkbox"
          />
          Cita inmediata
        </Label>
      </div>
      {!checkAppointment && (
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                labelClassName="flex items-center"
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-purple-400 outline-none"
                onChange={handleInputChange}
                value={formData.date}
                label="Fecha"
                name="date"
                icon={<Calendar size={18} className="mr-2 text-purple-500" />}
                type="date"
                required
              />
            </div>

            <div>
              <Input
                labelClassName="flex items-center"
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-purple-400 outline-none"
                icon={<Clock size={18} className="mr-2 text-purple-500" />}
                onChange={handleInputChange}
                value={formData.time}
                label="Hora"
                type="time"
                name="time"
                required
              />
            </div>
          </div>

          {(formData.date || formData.time) && (
            <div className="flex justify-center pt-4">
              <Button onClick={handleUncheckAll}>Quitar fecha y hora</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
