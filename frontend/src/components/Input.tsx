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
  labelText: label_text,
  id,
  name,
  inputRequired: input_required = false,
  value,
  onChange,
}) => {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label_text}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        required={input_required}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
};

export default Input;
