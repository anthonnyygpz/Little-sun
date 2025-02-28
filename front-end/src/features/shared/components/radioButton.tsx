type RadioButtonGroupProps = {
  idKey: number;
  name: string;
  value: string;
  price?: number;
  selectedValue: string;
  onChange: (data: {
    selectedValue: string;
    id: number;
    price: number;
  }) => void;
};

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  idKey,
  name,
  value,
  price = 0,
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
        onChange={(e) =>
          onChange({ selectedValue: e.target.value, id: idKey, price: price })
        }
      />
      {name}
    </label>
  );
};

export default RadioButtonGroup;
