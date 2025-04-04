import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants/routes";

export const useLoginForm = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login({
        email: email,
        password: password,
      });
      if (rememberMe) {
        console.log("Login persistenten");
      } else {
        console.log("Login temporal");
      }
    } catch (err) {
      console.error("Login error", err);
      const message =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTE_PATHS.APPOINTMENTS);
    }
  }, [isAuthenticated, navigate]);

  return {
    handleSubmit,
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    loading,
    error,
  };
};
