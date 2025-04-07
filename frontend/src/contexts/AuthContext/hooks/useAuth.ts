import { Credentials } from "../../../types/auth.types";
import { createContext, useContext } from "react";
import { AuthState } from "../types/auth.types";

interface AuthContextType extends AuthState {
  login: (remeberMe: boolean, credentials: Credentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
