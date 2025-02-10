interface CheckboxListProps {
  idKey: number;
  name: string;
  selectedOptions: number[];
  handleCheckboxChange: (option: number, name: string) => void;
}

export const CheckboxList: React.FC<CheckboxListProps> = ({
  idKey,
  name,
  selectedOptions,
  handleCheckboxChange,
}) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={selectedOptions.includes(idKey)}
        onChange={() => handleCheckboxChange(idKey, name)}
      />
      {name}
    </label>
  );
};
