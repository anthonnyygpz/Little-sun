import { ReactNode } from "react";
import { useMobilTable } from "./hooks/useMobilTable";
import { ChevronRight, Pen, Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";

export const MobilTable: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="md:hidden">
      <ul className="divide-y divide-gray-200">{children}</ul>
    </div>
  );
};

export const LiContainer: React.FC<{
  children?: ReactNode;
  id: number;
  nameData?: string;
  route: string;
  openDialog: () => void;
}> = ({ children, nameData, id, route, openDialog }) => {
  const { toggleRow, expandedRow } = useMobilTable();

  const isExpanded = expandedRow === id;
  return (
    <li key={id} className="p-4">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => toggleRow(id)}
      >
        <div className="font-medium">{nameData}</div>
        <div className="flex items-center gap-2">
          <ChevronRight
            className={`${isExpanded ? "rotate-90" : ""} h-5 w-5 transition-transform`}
          />
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {isExpanded && (
          <div className="mt-3 flex flex-col gap-2 text-sm">{children}</div>
        )}
        <div className="mt-2 flex space-x-2 border-t border-gray-100 pt-2">
          <Link
            to={route}
            className="flex w-full flex-1 cursor-pointer items-center justify-center gap-1 rounded-md bg-blue-500 px-3 py-2 text-white transition-colors hover:bg-blue-600"
          >
            <Pencil className="h-4 w-4" /> <span>Editar</span>
          </Link>{" "}
          <button
            className="flex cursor-pointer items-center justify-center rounded-md p-2 btn-red"
            onClick={() => openDialog()}
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </li>
  );
};

export const ItemLi: React.FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="text-gray-500">{title}</div>
      <div>{children}</div>
    </div>
  );
};

export const FooterMobil = () => {
  return (
    <div className="flex items-center justify-between p-4 mt-4">
      <button
        className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled
      >
        Anterior
      </button>
      <span className="text-sm text-gray-600">Página 1 de 1</span>
      <button
        className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled
      >
        Siguiente
      </button>
    </div>
  );
};
