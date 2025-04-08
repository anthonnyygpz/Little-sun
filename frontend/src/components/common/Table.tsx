import { ChevronLeft, ChevronRight, Pencil, Trash } from "lucide-react";
import React, { ReactNode } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { twMerge } from "tailwind-merge";
import { Button } from "./Button";
import { useModalAlert } from "../../hooks/useModalAlert";

export const Table: React.FC<{ children?: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <table className={twMerge("w-full text-left text-sm", className)}>
      {children}
    </table>
  );
};

export const Thead: React.FC<{ children?: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <thead
      className={twMerge(
        "bg-gray-50 text-gray-700 uppercase text-center",
        className,
      )}
    >
      {children}
    </thead>
  );
};

export const Tbody: React.FC<{ children?: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <tbody
      className={twMerge("divide-y divide-gray-300 text-center", className)}
    >
      {children}
    </tbody>
  );
};

export const Th: React.FC<{
  children?: ReactNode;
  className?: string;
  colSpan?: number;
}> = ({ children, className, colSpan }) => {
  return (
    <th className={twMerge("px-4 py-3", className)} colSpan={colSpan}>
      {children}
    </th>
  );
};

export const Td: React.FC<{
  children?: ReactNode;
  className?: string;
  colSpan?: number;
}> = ({ children, className, colSpan }) => {
  return (
    <td colSpan={colSpan} className={twMerge("px-4 py-3", className)}>
      {children}
    </td>
  );
};

export const Tfoot: React.FC<{
  className?: string;
  nextPage?: () => void;
  prevPage?: () => void;
  colSpan?: number;
}> = ({ className, nextPage, prevPage, colSpan }) => {
  return (
    <tfoot
      className={twMerge(
        "bg-gray-50 text-gray-700 uppercase text-center",
        className,
      )}
    >
      <tr>
        <Th>Pagina</Th>
        <Td colSpan={colSpan}>
          <div className="flex justify-end items-center gap-2">
            <button
              className="hover:bg-gray-300 active:bg-gray-200 rounded-full p-2 transition-colors group disabled:bg-transparent"
              onClick={prevPage}
            >
              <ChevronLeft className="group-disabled:text-transparent" />
            </button>
            <span className="text-lg">1</span>
            <button
              className="hover:bg-gray-300 active:bg-gray-200 rounded-full p-2 transition-colors group disabled:bg-transparent"
              onClick={nextPage}
            >
              <ChevronRight className="group-disabled:text-transparent" />
            </button>
          </div>
        </Td>
      </tr>
    </tfoot>
  );
};

export const LoadingTd: React.FC<{ count: number }> = ({ count }) => {
  return (
    <tr>
      {Array.from({ length: count }).map((_, index) => (
        <td key={index} className="px-4 py-3">
          <Skeleton />
        </td>
      ))}
    </tr>
  );
};

export const LoadingTbody: React.FC<{ count: number }> = ({ count }) => {
  return (
    <>
      {Array.from({ length: 12 }).map((_, index) => (
        <SkeletonTheme key={index}>
          <LoadingTd count={count} />
        </SkeletonTheme>
      ))}
    </>
  );
};

export const TdActions: React.FC<{
  editRoute: string;
  openDialog: () => void;
}> = ({ editRoute, openDialog }) => {
  return (
    <Td>
      <div className="flex justify-center flex-row gap-2">
        <Button
          className="btn-blue flex items-center gap-1 rounded-md px-3 py-1"
          href={editRoute}
        >
          <Pencil className="h-4 w-4" />
          <span>Editar</span>
        </Button>
        <Button
          className="btn-red flex items-center rounded-md p-2"
          onClick={() => openDialog()}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </Td>
  );
};
