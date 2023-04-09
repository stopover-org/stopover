import React from "react";
import { Sheet } from "@mui/joy";
import OutlinedIcons from "../OutlinedRatingIcons";
import FulfilledIcons from "../FulfilledRatingIcons";

interface RatingProps {
  rating: number;
}

export const Rating = ({ rating = 5 }: RatingProps) => {
  const ratingPercentage = React.useMemo(
    () => `${(rating / 5) * 100}%`,
    [rating]
  );

  return (
    <Sheet sx={{ position: "relative" }}>
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
    </Sheet>
  );
};

export default React.memo(Rating);
