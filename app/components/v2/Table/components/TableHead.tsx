import React from "react";
import { Tooltip } from "@mui/joy";

interface BaseHeadProps {
  cells: TableHeadCellValue[];
}

export interface TableHeadCellValue {
  label: string | React.ReactNode | React.ReactElement;
  width?: string | number;
  key: string;
}

interface HeadProps extends BaseHeadProps {}

const TableHead = (props: HeadProps) => {
  const { cells } = props;

  return (
    <thead>
      <tr>
        {cells.map((headCell, index) => (
          <th
            key={`${headCell.key}-${index}`}
            style={{ width: headCell.width }}
            title={headCell.label?.toString()}
          >
            <Tooltip title={headCell.label?.toString()} placement="top-start">
              <span>{headCell.label}</span>
            </Tooltip>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default React.memo(TableHead);
