import { LOCAL_STORAGE } from "../constants/localStorage";
import { useLocalStorage } from "./useLocalStorage";

export const useProtectedRoute = () => {
  const { get: GetToken } = useLocalStorage();

  const isAuthenticated = () => {
    const token = GetToken(LOCAL_STORAGE.TOKEN);
    if (token) {
      return true;
    } else {
      return false;
    }
  };
  return { isAuthenticated };
};
