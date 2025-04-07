import { Link } from "react-router-dom";
import { RegisterForm } from "../../feactures/Auth/components/RegisterForm";
import { ROUTE_PATHS } from "../../constants/routes";

export const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full mx-auto max-w-[30rem]">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Registrarse</h2>
          <p className="mt-3 text-lg  text-gray-600">
            Ingresa tus datos para registrate
          </p>
        </div>
        {/* formulario */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <RegisterForm />
          <p className="mt-10 text-center text-lg text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link
              className="font-medium text-purple-600 hover:text-purple-500"
              to={ROUTE_PATHS.LOGIN}
            >
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
