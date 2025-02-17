import React, { ReactNode } from "react";

interface TableHeadProps {
  children: ReactNode;
}

const TableHead: React.FC<TableHeadProps> = ({ children }) => {
  return (
    <thead>
      <tr>
        <th>{children}</th>
      </tr>
    </thead>
  );
};

export default TableHead;
