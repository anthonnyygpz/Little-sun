import { FormEvent, useState } from "react";
import { userService } from "../../../api/userService";
import toast from "react-hot-toast";
import { TOAST_MESSAGE } from "../../../constants/toast";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../../constants/routes";

export const useRegisterForm = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    try {
      await userService.createUser({
        email: email,
        username: username,
        password: password,
      });
      toast.success(TOAST_MESSAGE.SUCCESS_CREATE);
      navigate(ROUTE_PATHS.LOGIN);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ocurrio un error desconocido.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    loading,
    error,
    handleSubmit,
  };
};
