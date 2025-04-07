import { FIELD_VALIDATIONS } from "../constants/fieldValidation";

export const useFieldValidation = () => {
  const filterFieldValue = (name: string, value: string): string => {
    const validationPattern =
      FIELD_VALIDATIONS[name as keyof typeof FIELD_VALIDATIONS];
    return value.replace(validationPattern, "");
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  return { filterFieldValue, isValidEmail };
};
