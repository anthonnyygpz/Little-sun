import { useState } from "react";
import { useNavigate } from "react-router";

import { Calendar, DraftingCompass, Palette, Plus, User } from "lucide-react";
import { ROUTE_PATHS } from "../../../constants/routes";

export const useMenuHamburguer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuHamburguerButtons = [
    {
      title: "Citas",
      subDetails: [
        {
          title: "Ver todas las citas",
          icon: <Calendar className="w-5 h-5 mr-3" />,
          route: ROUTE_PATHS.APPOINTMENTS,
        },
        {
          title: "Generar cita",
          icon: <Plus className="w-5 h-5 mr-3" />,
          route: ROUTE_PATHS.CREATE_APPOINTMENT,
        },
      ],
    },
    {
      title: "Clientes",
      subDetails: [
        {
          title: "Clientes",
          icon: <User className="w-5 h-5 mr-3" />,
          route: ROUTE_PATHS.CLIENT,
        },
      ],
    },
    {
      title: "Servicios de uñas",
      subDetails: [
        {
          title: "Servicios",
          icon: <DraftingCompass className="w-5 h-5 mr-3" />,
          route: ROUTE_PATHS.NAIL_SERVICE,
        },
        {
          title: "Crear Servicio",
          icon: <Plus className="w-5 h-5 mr-3" />,
          route: ROUTE_PATHS.CREATE_NAIL_SERVICE,
        },
      ],
    },
    {
      title: "Diseños de uñas",
      subDetails: [
        {
          title: "Diseños",
          icon: <Palette className="w-5 h-5 mr-3" />,
          route: ROUTE_PATHS.NAIL_DESIGN,
        },
        {
          title: "Crear Diseño",
          icon: <Plus className="w-5 h-5 mr-3" />,
          route: ROUTE_PATHS.CREATE_NAIL_DESIGN,
        },
      ],
    },
  ];
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, navigate, toggleSidebar, menuHamburguerButtons };
};
