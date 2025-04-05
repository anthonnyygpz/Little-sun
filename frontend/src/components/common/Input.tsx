import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Label } from "./Label";

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
  label?: string;
  icon?: ReactNode;
}

export const Input: React.FC<InputProps> = ({
  icon,
  type,
  placeholder,
  name,
  required,
  value = "",
  onChange,
  className,
  autoComplete,
  minLength,
  label,
}) => {
  const [touched, setTouched] = useState<boolean>(false);
  const hasError = required && touched && value.trim() === "";

  const handleBlur = () => setTouched(true);

  return (
    <>
      <Label
        htmlFor={name}
        className="flex items-center gap-0"
        title={
          required
            ? "Todos los cuadros de texto que tenga un * es requerido"
            : ""
        }
      >
        {icon}
        <span>{label}</span>
        {required && <span className="text-red-500">*</span>}
      </Label>
      <input
        className={twMerge(
          `w-full px-3 py-2 border rounded-md outline-none focus:ring-2 transition-colors ${
            hasError
              ? "border-red-500 text-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-purple-200 focus:border-purple-400"
          }`,
          className,
        )}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        autoComplete={autoComplete}
        minLength={minLength}
        onBlur={handleBlur}
        value={value}
        type={type}
        name={name}
        id={name}
      />
      {hasError && (
        <p className="mt-1 text-sm text-red-500">Este campo es obligatorio</p>
      )}
    </>
  );
};
