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
  onRowClick?: (index: number) => void;
}

interface TableProps
  extends Omit<JoyTableProps, keyof BaseTableProps>,
    BaseTableProps {}

const Table = ({
  headers,
  data,
  withPagination,
  paginationProps,
  onRowClick,
}: TableProps) => {
  const keys = React.useMemo(
    () => headers.map((header) => header.key),
    [headers]
  );

  const rows = React.useMemo(() => {
    if (!withPagination) {
      return data;
    }

    return data.slice(
      (paginationProps!.page - 1) * paginationProps!.rowsPerPage,
      paginationProps!.page * paginationProps!.rowsPerPage
    );
  }, [data, paginationProps, withPagination]);

  const computedPaginationProps = React.useMemo(() => {
    if (!withPagination) {
      return undefined;
    }

    const currentPage = paginationProps!.page;
    const perPage = paginationProps!.rowsPerPage;
    const internalHasNext = perPage * currentPage < data.length;
    const internalHasPrevious = currentPage !== 1;
    const hasNext = internalHasNext || paginationProps?.hasNext;
    const hasPrevious = internalHasPrevious || paginationProps?.hasPrevious;
    const onNextPage = () => {
      if (internalHasNext && paginationProps?.setPage instanceof Function) {
        paginationProps?.setPage(currentPage + 1);
      } else {
        paginationProps?.onNextPage();
      }
    };

    const onPrevPage = () => {
      if (internalHasPrevious && paginationProps?.setPage instanceof Function) {
        paginationProps?.setPage(currentPage - 1);
      } else {
        paginationProps?.onPrevPage();
      }
    };

    return {
      ...paginationProps,
      rowsPerPage: perPage || 10,
      page: currentPage || 1,
      hasNext,
      hasPrevious,
      onNextPage,
      onPrevPage,
    };
  }, [data, paginationProps, withPagination]);

  const onRowClickHandler = React.useCallback(
    (index: number) => {
      if (!(onRowClick instanceof Function)) {
        return;
      }

      if (withPagination) {
        onRowClick(
          (paginationProps!.page - 1) * paginationProps!.rowsPerPage + index
        );
      } else {
        onRowClick(index);
      }
    },
    [onRowClick, paginationProps, withPagination]
  );

  return (
    <Sheet sx={{ overflow: "auto" }}>
      <JoyTable aria-labelledby="tableTitle" hoverRow>
        <TableHead cells={headers} />
        <TableBody data={rows} keys={keys} onRowClick={onRowClickHandler} />
        {withPagination && (
          <TablePagination
            {...(computedPaginationProps as TablePaginationProps)}
          />
        )}
      </JoyTable>
    </Sheet>
  );
};

export default React.memo(Table);
