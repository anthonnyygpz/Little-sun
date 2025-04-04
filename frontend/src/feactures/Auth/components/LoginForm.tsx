import { Link } from "react-router-dom";
import { useLoginForm } from "../hooks/useLoginForm";
import { ROUTE_PATHS } from "../../../constants/routes.ts";
import { Loader } from "lucide-react";

export const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    loading,
    // error,
    handleSubmit,
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="email"
        >
          Correo electrónico:
        </label>
        <input
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="ejemplo@correo.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          id="email"
          required
        />
      </div>

      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="password"
        >
          Contraseña:
        </label>
        <input
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="Tu contraseña"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          type="password"
          id="password"
          required
        />
      </div>

      <div>
        <div className="flex flex-row gap-2">
          <input
            onChange={() => setRememberMe(!rememberMe)}
            checked={rememberMe}
            type="checkbox"
            id="remember"
          />
          <label htmlFor="remember">Recordarme</label>
        </div>

        <Link
          className="text-purple-500 hover:text-purple-700"
          to={ROUTE_PATHS.LOGIN}
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <span className="text-red-700 flex justify-center"></span>

      <button
        className="btn-purple rounded p-1"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <Loader className="w-full animate-spin" />
        ) : (
          "Iniciar Sesión"
        )}
      </button>

      <div className="grid place-items-center">
        <span className="text-sm font-medium text-gray-700">
          ¿No tienes una cuenta?
        </span>
        <Link
          className="text-purple-500 hover:text-purple-700"
          to={ROUTE_PATHS.REGISTER}
        >
          Registrate
        </Link>
      </div>
    </form>
  );
};
