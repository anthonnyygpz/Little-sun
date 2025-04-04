import { RegisterForm } from "../../feactures/Auth/components/RegisterForm";

export const RegisterPage = () => {
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md">
        <div className="flex justify-center pb-6 text-2xl">
          <h2>Registrarse</h2>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};
