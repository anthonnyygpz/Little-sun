import { useLoginForm } from "../hooks/useLoginForm";
import { ROUTE_PATHS } from "../../../constants/routes.ts";
import { Loader } from "lucide-react";
import { Input } from "../../../components/common/Input.tsx";
import { Label } from "../../../components/common/Label.tsx";
import { Button } from "../../../components/common/Button.tsx";

export const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    loading,
    error,
    handleSubmit,
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <Input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          placeholder="tucorreo@ejemplo.com"
          label="Correo electrónico"
        />
      </div>

      <div>
        <Input
          label="Contraseña"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          placeholder="••••••••"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            id="rememberMe"
            name="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            type="checkbox"
            className="h-4 w-4 accent-purple-500 focus:ring-purple-500 border-gray-300 rounded"
          />
          <Label htmlFor="rememberMe">Recordarme</Label>
        </div>
        <div>
          <Button
            href={ROUTE_PATHS.FORGOT_PASSWORD}
            className="font-medium  text-purple-600 hover:text-purple-500"
          >
            ¿Olvidaste tu contraseña?
          </Button>
        </div>
      </div>

      <span className="block text-red-500 text-center">{error}</span>

      <div>
        <Button type="submit">
          {loading ? <Loader className="h-7 w-7  animate-spin" /> : "Ingresar"}
        </Button>
      </div>
    </form>
  );
};
