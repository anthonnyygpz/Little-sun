interface InputProps {
  type: string;
  placeholder: string;
  labelText: string;
  id: string;
  name: string;
  inputRequired?: boolean;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  labelText,
  id,
  name,
  inputRequired: input_required = false,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      name={name}
      required={input_required}
      value={value}
      onChange={onChange}
      autoComplete="off"
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
    />
  );
};

export default Input;
