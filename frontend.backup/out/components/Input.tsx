interface InputProps {
  type: string;
  placeholder: string;
  label_text: string;
  id: string;
  name: string;
  is_required: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  label_text,
  id,
  name,
  is_required,
  value,
  onChange,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label_text}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        required={is_required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
