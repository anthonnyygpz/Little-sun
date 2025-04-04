import { SculpingNailSizeForm } from "../../types/sculpingNailSize.types";
import { Label } from "./Label";

interface RadioButtonProps {
  idKey: number;
  name: string;
  value: string;
  price?: number;
  selectedValue: string;
  onChange: (data: SculpingNailSizeForm) => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  idKey,
  name,
  value,
  price = 0,
  onChange,
  selectedValue,
}) => {
  return (
    <Label className="flex gap-1" htmlFor={`radio-${idKey}-${value}`}>
      <input
        onChange={(e) =>
          onChange({
            selectedValue: e.target.value,
            size_id: idKey,
            price: price,
          })
        }
        checked={selectedValue === value}
        id={`radio-${idKey}-${value}`}
        value={value}
        type="radio"
        name={name}
      />
      {name}
    </Label>
  );
};
