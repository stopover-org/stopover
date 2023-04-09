import {
  FormControl,
  FormHelperText,
  FormLabel,
  Slider,
  SliderProps,
  Typography,
} from "@mui/joy";
import React from "react";

interface BaseSliderRangeProps {
  min: number;
  max: number;
  value: number[];
  hint?: React.ReactNode;
  error?: React.ReactNode;
  label?: React.ReactNode;
  onChange: (range: number[]) => void;
}

export interface SliderRangeProps
  extends Omit<SliderProps, keyof BaseSliderRangeProps>,
    BaseSliderRangeProps {}

const SliderRange = ({
  min,
  max,
  onChange,
  value,
  label,
  hint,
  error,
  ...props
}: SliderRangeProps) => (
  <FormControl>
    {label && <FormLabel>{label}</FormLabel>}
    <Slider
      min={min}
      max={max}
      onChange={(event, val) => onChange(val as number[])}
      value={value}
      {...props}
    />
    {hint && <FormHelperText>{hint}</FormHelperText>}
    {error && (
      <FormHelperText>
        <Typography fontSize="sm" color="danger">
          {error}
        </Typography>
      </FormHelperText>
    )}
  </FormControl>
);

export default React.memo(SliderRange);
