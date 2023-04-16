import React from "react";
import { Sheet, Stack } from "@mui/joy";
import OutlinedIcons from "../OutlinedRatingIcons";
import FulfilledIcons from "../FulfilledRatingIcons";

interface RatingProps {
  rating: number;
  label?: React.ReactNode;
}

export const Rating = ({ rating = 5, label }: RatingProps) => {
  const ratingPercentage = React.useMemo(
    () => `${(rating / 5) * 100}%`,
    [rating]
  );

  return (
    <Stack
      flexDirection="row"
      alignItems="flex-end"
      sx={{ position: "relative" }}
    >
      <Sheet
        sx={{
          display: "block",
          backgroundColor: "transparent",
          width: `${30 * 5}px`,
          zIndex: 99,
        }}
      >
        <OutlinedIcons />
      </Sheet>
      <Sheet
        sx={{
          display: "block",
          width: `${30 * 5}px`,
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 100,
          backgroundColor: "transparent",
        }}
      >
        <FulfilledIcons ratingPercentage={ratingPercentage} />
      </Sheet>
      <Sheet style={{ paddingBottom: "5px" }}>{label}</Sheet>
    </Stack>
  );
};

export default React.memo(Rating);
