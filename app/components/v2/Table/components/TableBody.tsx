import React from "react";
import Typography from "../../Typography";
import { useIds } from "../../../../lib/hooks/useIds";

export interface TableBodyCellValue
  extends Record<
    string,
    | React.ReactNode
    | React.ReactElement
    | string
    | number
    | Array<React.ReactNode | React.ReactElement | string | number>
  > {}

interface BaseTableBodyProps {
  data: TableBodyCellValue[];
  keys: string[];
  onRowClick: (index: number) => void;
}

interface TableBodyProps extends BaseTableBodyProps {}

const TableBody = ({ data, keys, onRowClick }: TableBodyProps) => {
  const ids = useIds(data);
  const [expanded, setExpanded] = React.useState<number[]>([]);
  return (
    <tbody>
      {data.map((row, index) => (
        <>
          <tr
            key={`${ids[index]}-${index}`}
            onClick={() => onRowClick(index)}
            style={{ verticalAlign: "top" }}
          >
            {keys.map((key) => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <td
                key={`${ids[index]}-${key}-${index}`}
                onClick={() => {
                  if (key === "expand") {
                    if (expanded.includes(index)) {
                      setExpanded(expanded.filter((v) => v !== index));
                    } else {
                      setExpanded([...expanded, index]);
                    }
                  }
                }}
              >
                {row[key]}
              </td>
            ))}
          </tr>

          {expanded.includes(index) && Array.isArray(row.tables) && (
            <>
              {row.tables?.map((table) => (
                <>
                  <br />
                  <tr>
                    <td colSpan={keys.length}>{table}</td>
                  </tr>
                </>
              ))}
              <br />
              <tr>
                <td colSpan={keys.length} />
              </tr>
              <br />
            </>
          )}
        </>
      ))}
      {data.length === 0 && (
        <tr>
          <td style={{ textAlign: "center" }} colSpan={keys.length}>
            <Typography fontSize="sm">There is no data</Typography>
          </td>{" "}
        </tr>
      )}
    </tbody>
  );
};

export default React.memo(TableBody);
