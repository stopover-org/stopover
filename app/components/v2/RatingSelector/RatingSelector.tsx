import React from "react";
import { Sheet } from "@mui/joy";
import OutlinedIcons from "../OutlinedRatingIcons";
import FulfilledIcons from "../FulfilledRatingIcons";

interface RatingSelectorProps {
  rating: number;
  onSelect: (rating: number) => void;
}

export const RatingSelector = ({
  rating = 5,
  onSelect,
}: RatingSelectorProps) => {
  const [hoveredRating, setHoveredRating] = React.useState(rating);
  const ratingPercentage = React.useMemo(
    () => `${(hoveredRating / 5) * 100}%`,
    [rating, hoveredRating]
  );

  const onMouseEnter = React.useCallback(
    (rtng: number) => {
      setHoveredRating(rtng);
    },
    [setHoveredRating]
  );

  const onMouseLeave = React.useCallback(() => {
    setHoveredRating(rating);
  }, [rating, setHoveredRating]);

  const onRatingSelect = React.useCallback(
    (rtng: number) => {
      setHoveredRating(rtng);

      onSelect(rtng);
    },
    [setHoveredRating, rating, onSelect]
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
        <OutlinedIcons
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onRatingSelect}
        />
      </Sheet>
      <Sheet
        sx={{
          display: "block",
          width: `${30 * 5}px`,
          backgroundColor: "transparent",
          zIndex: 100,
          position: "absolute",
          left: 0,
          top: 0,
          pointerEvents: "none",
        }}
      >
        <FulfilledIcons
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onRatingSelect}
          ratingPercentage={ratingPercentage}
        />
      </Sheet>
    </Sheet>
  );
};

export default React.memo(RatingSelector);
