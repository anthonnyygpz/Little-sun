import { Button } from "../../../components/common/Button";
import { Input } from "../../../components/common/Input";
import { Label } from "../../../components/common/Label";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants/routes";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { Loader } from "lucide-react";

export const RegisterForm = () => {
  const {
    email,
    setEmail,
    username,
    setUsername,
    loading,
    password,
    setPassword,
    handleSubmit,
  } = useRegisterForm();
  console.log(loading);
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="email">Correo</Label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@correo.com"
          required={true}
          value={email}
          type="email"
          name="email"
        />
      </div>

      <div>
        <Label htmlFor="username">Usuario</Label>
        <Input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de usuario"
          required={true}
          value={username}
          type="text"
          name="username"
        />
      </div>

      <div>
        <Label htmlFor="password">Contraseña</Label>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          required={true}
          value={password}
          type="password"
          name="password"
          minLength={8}
        />
      </div>

      <Button type="submit">
        {loading ? <Loader className="w-full animate-spin" /> : "Registrarse"}
        {/* {loading ? "Registrarse" : <Loader className="w-full animate-spin" />} */}
      </Button>

      <div className="grid place-items-center">
        <span className="text-sm font-medium text-gray-700">
          ¿Ya tienes una cuenta?
        </span>
        <Link
          className="text-purple-500 hover:text-purple-700"
          to={ROUTE_PATHS.LOGIN}
        >
          Iniciar Sesión
        </Link>
      </div>
    </form>
  );
};
