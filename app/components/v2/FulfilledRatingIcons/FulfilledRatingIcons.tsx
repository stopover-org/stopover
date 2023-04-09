import React from "react";
import { Sheet, SheetProps, Stack, styled } from "@mui/joy";
import { Star as StarIcon } from "@mui/icons-material";

const Item = styled(Sheet)(({ theme }) => ({
  textAlign: "center",
  color: theme.vars.palette.text.tertiary,
}));

interface BaseIconProps {
  ratingPercentage: string;
}

interface IconProps
  extends Omit<SheetProps, keyof BaseIconProps>,
    BaseIconProps {}

const FulfilledIcons = ({ ratingPercentage, ...props }: IconProps) => (
  <Stack
    direction="row"
    justifyContent="flex-start"
    sx={{ width: ratingPercentage, overflow: "hidden" }}
  >
    {new Array(5).fill("").map((_, index) => (
      <Item key={`fulfilled-${index}`} {...props}>
        <StarIcon color="primary" sx={{ width: "30px", height: "30px" }} />
      </Item>
    ))}
  </Stack>
);

export default React.memo(FulfilledIcons);
