import { Box, FormControl, FormLabel, IconButton, Option } from "@mui/joy";
import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Select from "../../../Select";
import Typography from "../../../Typography";

export interface TablePaginationProps {
  rowsPerPageOptions?: number[];
  rowsPerPage?: number;
  page?: number;
  onPerPageChange?: () => void;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  canNext?: boolean;
  canPrev?: boolean;
  colSpan: number;
}

const TablePagination = ({
  rowsPerPageOptions = [],
  rowsPerPage = 10,
  page = 1,
  onPerPageChange,
  onNextPage,
  onPrevPage,
  canNext = true,
  canPrev = true,
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
          {rowsPerPageOptions && rowsPerPageOptions.length > 0 && (
            <FormControl orientation="horizontal" size="sm">
              <FormLabel>Rows per page:</FormLabel>
              <Select onChange={onPerPageChange} value={rowsPerPage}>
                <Option value={5}>5</Option>
                <Option value={10}>10</Option>
                <Option value={25}>25</Option>
              </Select>
            </FormControl>
          )}
          <Typography textAlign="center" sx={{ minWidth: 80 }}>
            {page}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              size="sm"
              color="neutral"
              variant="outlined"
              disabled={canPrev}
              onClick={onPrevPage}
              sx={{ bgcolor: "background.surface" }}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton
              size="sm"
              color="neutral"
              variant="outlined"
              disabled={canNext}
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
