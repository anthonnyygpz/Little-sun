const useAuth = () => {
  const isAuthenticated = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      return true;
    } else {
      return false;
    }
  };
  return { isAuthenticated };
};

export default useAuth;
