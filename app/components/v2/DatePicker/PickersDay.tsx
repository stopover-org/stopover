import { Moment } from "moment";
import React from "react";
import {
  PickersDay as JoyPickersDay,
  PickersDayProps as JoyPickersDayProps,
} from "@mui/x-date-pickers/PickersDay";
import { Box } from "@mui/joy";

interface BasePickersDayProps {
  highlighted?: boolean;
}

interface PickersDayProps
  extends Omit<JoyPickersDayProps<Moment>, keyof BasePickersDayProps>,
    BasePickersDayProps {}

const PickersDay = ({ day, highlighted, ...props }: PickersDayProps) => (
  <Box sx={{ position: "relative" }}>
    <JoyPickersDay {...props} sx={{ borderRadius: 0 }} day={day} />
    {highlighted && (
      <Box
        sx={{
          position: "absolute",
          backgroundColor: "var(--joy-palette-danger-500, #D3232F)",
          borderRadius: "50%",
          width: "6px",
          height: "6px",
          top: "-3px",
          right: "0px",
        }}
      />
    )}
  </Box>
);

export default React.memo(PickersDay);
