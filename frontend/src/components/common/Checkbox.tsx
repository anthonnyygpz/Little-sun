import { Label } from "./Label";

interface CheckboxProps {
  idKey: number;
  name: string;
  price?: number;
  selectedIds: number[];
  onChange: (option: number, service_name: string) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  selectedIds,
  onChange,
  idKey,
  price,
  name,
}) => {
  return (
    <Label
      className="flex gap-1 items-center p-3 rounded-lg bg-white border border-gray-200 hover:border-purple-400 cursor-pointer transition-colors"
      htmlFor={`radio-${idKey}-${name}`}
    >
      <input
        className="accent-purple-500 h-5 w-5"
        type="checkbox"
        id={`radio-${idKey}-${name}`}
        checked={selectedIds.includes(idKey)}
        onChange={() => onChange(idKey, name)}
      />

      <div className="flex items-center justify-between w-full ">
        <span>{name}</span>
        <span className="text-purple-500 font-bold">
          {price && `$ ${price}`}
        </span>
      </div>
    </Label>
  );
};
