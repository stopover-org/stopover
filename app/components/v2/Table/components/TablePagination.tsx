import { Box, FormControl, FormLabel, IconButton, Option } from "@mui/joy";
import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Select from "components/v2/Select";
import Typography from "components/v2/Typography";

export interface TablePaginationProps {
  rowsPerPageOptions?: number[];
  rowsPerPage: number;
  page: number;
  // eslint-disable-next-line react/no-unused-prop-types
  setPage?: (page: number) => void;
  onPerPageChange?: (page: number) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  colSpan: number;
}

const TablePagination = ({
  rowsPerPageOptions = [],
  rowsPerPage,
  page,
  onPerPageChange,
  onNextPage,
  onPrevPage,
  hasNext,
  hasPrevious,
  colSpan,
}: TablePaginationProps) => (
  <tfoot>
    <tr>
      <td colSpan={colSpan}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            justifyContent: "flex-end",
          }}
        >
          {rowsPerPageOptions &&
            rowsPerPageOptions.length > 1 &&
            rowsPerPageOptions.length > 0 && (
              <FormControl orientation="horizontal" size="sm">
                <FormLabel>Rows per page:</FormLabel>
                <Select
                  onChange={(perPage: number) => {
                    if (onPerPageChange instanceof Function) {
                      onPerPageChange(perPage);
                    }
                  }}
                  value={rowsPerPage}
                  size="sm"
                >
                  {rowsPerPageOptions.map((rowsPerPageOption) => (
                    <Option key={rowsPerPageOption} value={rowsPerPageOption}>
                      {rowsPerPageOption}
                    </Option>
                  ))}
                </Select>
              </FormControl>
            )}
          <Typography textAlign="center" sx={{ minWidth: 80 }} fontSize="sm">
            {page}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              size="sm"
              color="neutral"
              variant="outlined"
              disabled={!hasPrevious}
              onClick={onPrevPage}
              sx={{ bgcolor: "background.surface" }}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton
              size="sm"
              color="neutral"
              variant="outlined"
              disabled={!hasNext}
              onClick={onNextPage}
              sx={{ bgcolor: "background.surface" }}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </Box>
        </Box>
      </td>
    </tr>
  </tfoot>
);

export default React.memo(TablePagination);
