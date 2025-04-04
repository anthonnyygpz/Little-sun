import { twMerge } from "tailwind-merge";

interface InputProps {
  type?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  value?: string;
  autoComplete?: "off" | "on";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minLength?: number;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  name,
  required = false,
  value,
  onChange,
  className,
  autoComplete,
  minLength,
}) => {
  return (
    <input
      className={twMerge(
        "w-full p-3 border-b-2 border-gray-200 focus:border-purple-400 outline-none transition-colors",
        className,
      )}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      autoComplete={autoComplete}
      minLength={minLength}
      value={value}
      type={type}
      name={name}
      id={name}
    />
  );
};
