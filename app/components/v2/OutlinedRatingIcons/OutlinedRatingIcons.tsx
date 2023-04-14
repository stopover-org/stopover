import React from "react";
import { Sheet, SheetProps, Stack, styled } from "@mui/joy";
import { StarBorder as OutlinedStarIcon } from "@mui/icons-material";

const Item = styled(Sheet)(({ theme }) => ({
  textAlign: "center",
  color: theme.vars.palette.text.tertiary,
}));

interface BaseIconProps {
  onMouseEnter?: (rating: number) => void;
  onMouseLeave?: () => void;
  onClick?: (rating: number) => void;
}

interface IconProps
  extends Omit<SheetProps, keyof BaseIconProps>,
    BaseIconProps {}

const OutlinedIcons = ({
  onMouseEnter,
  onMouseLeave,
  onClick,
  ...props
}: IconProps) => (
  <Stack direction="row" justifyContent="flex-start">
    {new Array(5).fill("").map((_, index) => (
      <Item
        key={`outlined-${index}`}
        {...props}
        onMouseLeave={onMouseLeave}
        onMouseEnter={() => {
          if (onMouseEnter instanceof Function) {
            onMouseEnter(index + 1);
          }
        }}
        onClick={() => {
          if (onClick instanceof Function) {
            onClick(index + 1);
          }
        }}
      >
        <OutlinedStarIcon
          color="primary"
          sx={{ width: "30px", height: "30px" }}
        />
      </Item>
    ))}
  </Stack>
);

export default React.memo(OutlinedIcons);
