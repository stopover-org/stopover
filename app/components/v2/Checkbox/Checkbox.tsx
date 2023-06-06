import React, { ForwardedRef } from "react";
import {
  Checkbox as JoyCheckbox,
  CheckboxProps as JoyCheckboxProps,
  FormControl,
  FormHelperText,
} from "@mui/joy";

export interface CheckboxProps {
  label: string;
  hint?: string;
  error?: string;
}

const Checkbox = React.forwardRef(
  (
    {
      hint,
      ...props
    }: Omit<JoyCheckboxProps, keyof CheckboxProps> & CheckboxProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <FormControl>
      <JoyCheckbox checked={Boolean(props.value)} ref={ref} {...props} />
      {hint && <FormHelperText>{hint}</FormHelperText>}
    </FormControl>
  )
);

export default React.memo(Checkbox);
