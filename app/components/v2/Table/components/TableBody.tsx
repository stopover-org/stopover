import React from "react";
import Typography from "../../Typography";
import { useIds } from "../../../../lib/hooks/useIds";

export interface TableBodyCellValue
  extends Record<
    string,
    React.ReactNode | React.ReactElement | string | number
  > {}

interface BaseTableBodyProps {
  data: TableBodyCellValue[];
  keys: string[];
}

interface TableBodyProps extends BaseTableBodyProps {}

const TableBody = ({ data, keys }: TableBodyProps) => {
  const ids = useIds(data);
  return (
    <tbody>
      {data.map((row, index) => (
        <tr key={`${ids[index]}-${index}`}>
          {keys.map((key) => (
            <td key={`${ids[index]}-${key}-${index}`}>{row[key]}</td>
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
};

export default React.memo(TableBody);
