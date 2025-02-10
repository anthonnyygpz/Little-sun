import React, { ReactNode } from "react";

interface TableBodyProps {
  children: ReactNode;
}

const TableBody: React.FC<TableBodyProps> = ({ children }) => {
  return (
    <tbody>
      <tr>
        <td>{children}</td>
      </tr>
    </tbody>
  );
};

export default TableBody;
