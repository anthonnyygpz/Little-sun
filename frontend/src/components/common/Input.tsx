import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Label } from "../../components/common/Label";
import { useFieldValidation } from "../../hooks/useFieldValidation";
import { Eye, EyeClosed } from "lucide-react";

interface InputProps {
  type?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  value?: string;
  autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minLength?: number;
  className?: string;
  label?: string;
  icon?: ReactNode;
  requiredMessage?: string;
  emailMessage?: string;
  validationRules?: Array<{
    test: (value: string) => boolean;
    message: string;
  }>;
  inputClassName?: string;
  errorClassName?: string;
  labelClassName?: string;
  showPasswordToggle?: boolean;
  showPasswordIcon?: ReactNode;
  hidePasswordIcon?: ReactNode;
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
  requiredMessage = "Este campo es obligatorio.",
  emailMessage = "Por favor, introduce un correo electrónico válido.",
  validationRules = [],
  inputClassName,
  errorClassName,
  labelClassName,
  showPasswordToggle = true,
  showPasswordIcon = <Eye />,
  hidePasswordIcon = <EyeClosed />,
}) => {
  const [touched, setTouched] = useState(false);
  const { isValidEmail } = useFieldValidation();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const inputType =
    showPasswordToggle && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  const defaultValidationRules = [];
  if (required) {
    defaultValidationRules.push({
      test: (val: string) => val.trim() !== "",
      message: requiredMessage,
    });
  }
  if (type === "email") {
    defaultValidationRules.push({
      test: isValidEmail,
      message: emailMessage,
    });
  }

  const allValidationRules = [...defaultValidationRules, ...validationRules];
  const errors = touched
    ? allValidationRules
        .filter((rule) => !rule.test(value))
        .map((rule) => rule.message)
    : [];
  const hasError = errors.length > 0;

  const handleBlur = () => setTouched(true);

  return (
    <div className={className}>
      {label && (
        <Label
          htmlFor={name}
          title={required ? "Campo requerido" : ""}
          className={labelClassName}
        >
          {icon}
          <span>{label}</span>
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <div className="relative">
        <input
          className={twMerge(
            `appearance-none block w-full px-4 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none text-lg ${
              hasError
                ? "border-red-500 text-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            }`,
            inputClassName,
          )}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          autoComplete={autoComplete}
          minLength={minLength}
          onBlur={handleBlur}
          value={value}
          type={inputType}
          name={name}
          id={name}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />

        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? showPasswordIcon : hidePasswordIcon}
          </button>
        )}
      </div>

      {hasError && (
        <p
          id={`${name}-error`}
          className={twMerge(
            "mt-1 text-[2rem] lg:text-sm text-red-500",
            errorClassName,
          )}
        >
          {errors[0]}
        </p>
      )}
    </div>
  );
};
