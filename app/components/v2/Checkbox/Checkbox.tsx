import React, { ForwardedRef } from "react";
import {
  Checkbox as JoyCheckbox,
  CheckboxProps as JoyCheckboxProps,
  FormControl,
  FormHelperText,
} from "@mui/joy";

export interface CheckboxProps {
  onChange: (value: boolean | string | number) => void;
  label: string;
  hint?: string;
  error?: string;
}

const Checkbox = React.forwardRef(
  (
    {
      onChange,
      hint,
      ...props
    }: Omit<JoyCheckboxProps, keyof CheckboxProps> & CheckboxProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };
    return (
      <FormControl>
        <JoyCheckbox ref={ref} onChange={changeHandler} {...props} />
        <FormHelperText>{hint}</FormHelperText>
      </FormControl>
    );
  }
);

export default React.memo(Checkbox);
