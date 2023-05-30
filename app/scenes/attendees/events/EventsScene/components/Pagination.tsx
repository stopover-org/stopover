import React from "react";
import { Sheet, Stack, styled } from "@mui/joy";

interface PaginationProps {
  showPrev: boolean;
  showNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  currentPage: number;
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
}: PaginationProps) => (
  <Stack flexDirection="row">
    {(currentPage !== 1 || showPrev) && (
      <PaginationPoint variant="outlined" color="neutral" onClick={onPrev}>
        &lt;
      </PaginationPoint>
    )}

    <PaginationPoint variant="outlined" color="primary">
      {currentPage}
    </PaginationPoint>

    {showNext && (
      <PaginationPoint variant="outlined" color="neutral" onClick={onNext}>
        &gt;
      </PaginationPoint>
    )}
  </Stack>
);

export default React.memo(Pagination);
