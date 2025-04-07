import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../api/authService";
import { LOCAL_STORAGE } from "../../constants/localStorage";
import { ROUTE_PATHS } from "../../constants/routes";
import { Credentials } from "../../types/auth.types";
import { AuthState } from "./types/auth.types";
import { AuthContext } from "./hooks/useAuth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: "",
    isAuthenticated: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const checkAuth = async () => {
    setLoading(true);
    const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);

    try {
      if (!token) throw new Error("No token found");
      // verifica si el token es valido
      await authService.verifyToken(token);
      setAuthState({ token: token, isAuthenticated: true });
    } catch {
      localStorage.removeItem(LOCAL_STORAGE.TOKEN);
      setAuthState({ token: null, isAuthenticated: false });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (rememberMe: boolean, credentials: Credentials) => {
    setLoading(true);
    try {
      const { access_token } = await authService.login(credentials);
      localStorage.setItem(LOCAL_STORAGE.TOKEN, access_token);
      setAuthState({ token: access_token, isAuthenticated: true });

      navigate(ROUTE_PATHS.APPOINTMENTS);
    } catch (err) {
      console.error("Error to login: ", err);

      const message =
        err instanceof Error
          ? "Correo o contraseña invalido."
          : "error desconocido.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem(LOCAL_STORAGE.TOKEN);
    setAuthState({ token: "", isAuthenticated: false });
    navigate(ROUTE_PATHS.LOGIN);
  };
  return (
    <AuthContext.Provider
      value={{ ...authState, login, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
