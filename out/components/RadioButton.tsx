import { SculpingNailSize } from "../models/SculpingNailSize.models";

type RadioButtonGroupProps = {
  options: SculpingNailSize[];
  name: string;
  onChange: (selectedValue: string) => void;
  selectedValue: string;
};

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  name,
  onChange,
  selectedValue,
}) => {
  return (
    <div>
      {options.map((option: SculpingNailSize) => (
        <label key={option.size_name}>
          <input
            type="radio"
            name={name}
            value={option.size_name}
            checked={selectedValue === option.size_name}
            onChange={(e) => onChange(e.target.value)}
          />
          {option.size_name}
        </label>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
