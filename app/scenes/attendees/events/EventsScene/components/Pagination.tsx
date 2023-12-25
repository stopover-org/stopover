import React from "react";
import { Sheet, Stack, styled } from "@mui/joy";

interface PaginationProps {
  showPrev: boolean;
  showNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  currentPage: number;
  perPage: number;
  total: number;
}

const PaginationPoint = styled(Sheet)(() => ({
  padding: "15px",
  margin: "5px",
  cursor: "pointer",
}));

const Pagination = ({
  showPrev,
  showNext,
  onPrev,
  onNext,
  currentPage,
  perPage,
  total,
}: PaginationProps) => (
  <Stack flexDirection="row">
    {(currentPage !== 1 || showPrev) && (
      <PaginationPoint
        variant="outlined"
        color="neutral"
        onClick={onPrev}
        sx={currentPage !== 1 || showPrev ? { marginLeft: 0 } : {}}
      >
        &lt;
      </PaginationPoint>
    )}

    <PaginationPoint
      variant="outlined"
      color="primary"
      sx={!(currentPage !== 1 || showPrev) ? { marginLeft: 0 } : {}}
    >
      {currentPage}
    </PaginationPoint>

    {(showNext || total / perPage > currentPage) && (
      <PaginationPoint variant="outlined" color="neutral" onClick={onNext}>
        &gt;
      </PaginationPoint>
    )}
  </Stack>
);

export default React.memo(Pagination);
