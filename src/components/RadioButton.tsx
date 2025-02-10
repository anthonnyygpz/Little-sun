type RadioButtonGroupProps = {
  idKey: number;
  name: string;
  value: string;
  selectedValue: string;
  onChange: (selectedValue: string, id: number) => void;
};

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  idKey,
  name,
  value,
  onChange,
  selectedValue,
}) => {
  const inputId = `radio-${idKey}-${value}`;

  return (
    <label htmlFor={inputId}>
      <input
        id={inputId}
        type="radio"
        name={name}
        value={value}
        checked={selectedValue === value}
        onChange={(e) => onChange(e.target.value, idKey)}
      />
      {name}
    </label>
  );
};

export default RadioButtonGroup;
