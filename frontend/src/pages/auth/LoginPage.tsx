import { Link } from "react-router-dom";
import { LoginForm } from "../../feactures/Auth/components/LoginForm";
import { ROUTE_PATHS } from "../../constants/routes";

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 ">
      <div className="w-full mx-auto max-w-[30rem]">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="bg-purple-500 mx-auto h-15 w-15 rounded-full flex items-center justify-center mb-6">
            <svg
              className="h-10 w-10 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
          <p className="mt-3 text-lg text-gray-600">
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <LoginForm />
          <p className="mt-10 text-center text-lg text-gray-600">
            ¿No tienes una cuenta?
            <Link
              to={ROUTE_PATHS.REGISTER}
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
