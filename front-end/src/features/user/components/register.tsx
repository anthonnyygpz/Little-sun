import { FormEvent, useState } from "react";
import { Link } from "react-router";
import UserService from "../services/useService";
import { useNavigate } from "react-router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { registerUser } = UserService();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await registerUser({
        username: username,
        email: email,
        password: password,
      });
      if (user) {
        console.log("Register successful");
        navigate("/login");
      } else {
        setError("Error create user");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("An error occurred during register.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Registrarse</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              placeholder="Nombre del usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="error-container">
            <span>{error}</span>
          </div>

          <button type="submit" className="login-button">
            {loading ? "Cargando..." : "Registrar"}
          </button>
        </form>

        <div className="login-footer">
          ¿ya tienes una cuenta? <Link to="/Login">Iniciar sesion</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
