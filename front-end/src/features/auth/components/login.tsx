import { FormEvent, useState } from "react";
import AuthService from "../services/authService";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { generateToken } = AuthService();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = await generateToken(email, password);
      if (token) {
        console.log("Login successful");
        navigate("/");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md">
        <div className="flex justify-center pb-6">
          <h1 className="text-2xl">Iniciar sesión</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Correo electrónico
            </label>
            <input
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
              type="email"
              id="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
              type="password"
              id="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <div>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember" className="pl-2">
                Recordarme
              </label>
            </div>
            <Link to="#" className="text-purple-500 hover:text-purple-700">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <span className="text-red-700 flex justify-center">{error}</span>

          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 active:bg-white text-white active:text-purple-500 font-bold py-2 px-4 rounded"
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>
        <div className="">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/Register"
            className="text-purple-500 hover:text-purple-700"
          >
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
