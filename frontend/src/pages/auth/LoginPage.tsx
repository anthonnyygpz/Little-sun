import { LoginForm } from "../../feactures/Auth/components/LoginForm";

export const LoginPage = () => {
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md">
        <div className="flex justify-center pb-6 text-2xl">
          <h2>Iniciar Sesión</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};
