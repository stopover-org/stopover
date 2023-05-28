import React from "react";
import Typography from "../../Typography";

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
      <tr key={index}>
        {keys.map((key) => (
          <td key={`${key}-${index}`}>{row[key]}</td>
        ))}
      </tr>
    ))}
    {data.length === 0 && (
      <tr>
        <td style={{ textAlign: "center" }} colSpan={keys.length}>
          <Typography fontSize="lg">There is no data</Typography>
        </td>{" "}
      </tr>
    )}
  </tbody>
);

export default React.memo(TableBody);
