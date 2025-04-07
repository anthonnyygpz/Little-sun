import { Button } from "../../../components/common/Button";
import { Input } from "../../../components/common/Input";
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
        <Input
          label="Correo electrónico"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@correo.com"
          required={true}
          value={email}
          type="email"
          name="email"
        />
      </div>

      <div>
        <Input
          label="Nombre de usuario"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="ejem. Juan123"
          required={true}
          value={username}
          type="text"
          name="username"
        />
      </div>

      <div>
        <Input
          label="Contraseña"
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
        {loading ? <Loader className="w-7 h-7 animate-spin" /> : "Registrarse"}
      </Button>
    </form>
  );
};
