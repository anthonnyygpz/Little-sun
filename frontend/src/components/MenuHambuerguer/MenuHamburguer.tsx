import { Menu, X, LogOut } from "lucide-react";
import { Button } from "../common/Button";
import { useMenuHamburguer } from "./hooks/useMenuHamburguer";
import { ROUTE_PATHS } from "../../constants/routes";
import { useAuth } from "../../contexts/AuthContext/hooks/useAuth";

export const MenuHamburguer = () => {
  const { isOpen, toggleSidebar, menuHamburguerButtons } = useMenuHamburguer();
  const { logout } = useAuth();

  return (
    <div className="relative">
      <Button
        className="fixed bottom-4 left-4 z-50 p-2 rounded-md btn-purple focus:outline-none"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50  z-30"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6">Menu</h2>
          <ul className="flex flex-col gap-2">
            {menuHamburguerButtons.map((menu) => (
              <li key={menu.title}>
                <details className="group border border-gray-300 rounded-md p-1 transition-all duration-300">
                  <summary className="cursor-pointer font-medium transition-all duration-300 items-center p-2 rounded hover:bg-gray-700">
                    {menu.title}
                  </summary>

                  {menu.subDetails.map((detail) => (
                    <div
                      className="mt-3 transition-all duration-300 transform origin-top opacity-0 scale-95 group-open:opacity-100 group-open:scale-100"
                      key={detail.title}
                    >
                      <Button
                        className="flex items-center p-2 pl-5 rounded hover:bg-gray-700"
                        href={detail.route}
                      >
                        {detail.icon}
                        <span>{detail.title}</span>
                      </Button>
                    </div>
                  ))}
                </details>
              </li>
            ))}
            <li>
              <Button
                href={ROUTE_PATHS.LOGIN}
                onClick={logout}
                className="flex items-center p-2 rounded btn-red"
              >
                <LogOut className="w-5 h-5 mr-3 " />
                <span>Cerrar Sesion</span>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
