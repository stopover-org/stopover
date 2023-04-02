import React from "react";
import {
  FormControl,
  Radio as JoyRadio,
  RadioProps as JoyRadioProps,
  FormHelperText,
} from "@mui/joy";

export interface RadioProps {
  hint?: string;
  onChange: (value: boolean | string | number) => void;
}

const Radio = React.forwardRef(
  (
    {
      hint,
      onChange,
      ...props
    }: Omit<JoyRadioProps, keyof RadioProps> & RadioProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };

    return (
      <FormControl>
        <JoyRadio onChange={changeHandler} ref={ref} {...props} />
        <FormHelperText>{hint}</FormHelperText>
      </FormControl>
    );
  }
);

export default React.memo(Radio);
