export const useLocalStorage = () => {
  const set = (name: string, data: object) => {
    localStorage.setItem(name, JSON.stringify(data));
  };

  const get = (name: string) => {
    return localStorage.getItem(name);
  };

  const clear = (name: string) => {
    localStorage.removeItem(name);
  };
  return { set, get, clear };
};
