import React from "react";
import {
  Sheet,
  Table as JoyTable,
  TableProps as JoyTableProps,
} from "@mui/joy";
import TableHead, { TableHeadCellValue } from "./components/TableHead";
import TableBody, { TableBodyCellValue } from "./components/TableBody";
import TablePagination, {
  TablePaginationProps,
} from "./components/TablePagination";

interface BaseTableProps {
  headers: TableHeadCellValue[];
  data: TableBodyCellValue[];
  withPagination?: boolean;
  paginationProps?: TablePaginationProps;
}

interface TableProps
  extends Omit<JoyTableProps, keyof BaseTableProps>,
    BaseTableProps {}

const Table = ({
  headers,
  data,
  withPagination,
  paginationProps,
}: TableProps) => {
  const keys = React.useMemo(
    () => headers.map((header) => header.key),
    [headers]
  );
  return (
    <Sheet sx={{ overflow: "auto" }}>
      <JoyTable aria-labelledby="tableTitle" hoverRow>
        <TableHead cells={headers} />
        <TableBody data={data} keys={keys} />
        {withPagination && (
          <TablePagination {...paginationProps} colSpan={keys.length} />
        )}
      </JoyTable>
    </Sheet>
  );
};

export default React.memo(Table);
