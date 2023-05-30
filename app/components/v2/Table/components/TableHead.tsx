import React from "react";

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
          >
            {headCell.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default React.memo(TableHead);
