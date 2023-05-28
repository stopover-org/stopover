import React from "react";

export interface TableBodyCellValue {
  [key: string]: React.ReactNode | React.ReactElement | string | number;
}

interface BaseTableBodyProps {
  data: TableBodyCellValue[];
  keys: string[];
}

interface TableBodyProps extends BaseTableBodyProps {}

const TableBody = ({ data, keys }: TableBodyProps) => (
  <tbody>
    {data.map((row, index) => (
      <tr>
        {keys.map((key) => (
          <td key={`${key}-${index}`}>{row[key]}</td>
        ))}
      </tr>
    ))}
  </tbody>
);

export default React.memo(TableBody);
