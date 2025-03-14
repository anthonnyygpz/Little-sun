import { useState } from "react";
import { loginApi } from "../../../libs/enpoints/authApi";

const AuthService = () => {
  const [loadingToken, setLoadingToken] = useState<boolean>(true);
  const [errorToken, setErrorToken] = useState<string | null>(null);

  const generateToken = async (email: string, password: string) => {
    try {
      setLoadingToken(true);
      const generatedToken = await loginApi(email, password);
      sessionStorage.setItem("token", generatedToken.access_token);
      return true;
    } catch (error) {
      console.log("Error token: ", error);
      setErrorToken(`${error}`);
      setLoadingToken(true);
    } finally {
      setLoadingToken(false);
    }
  };

  return { generateToken, loadingToken, errorToken };
};

export default AuthService;
