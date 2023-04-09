import React, { ForwardedRef } from "react";
import {
  Checkbox as JoyCheckbox,
  CheckboxProps as JoyCheckboxProps,
  FormControl,
  FormHelperText,
} from "@mui/joy";

export interface CheckboxProps {
  onChange: (value: boolean | string | number) => void;
  value: string | number | boolean;
  label: string;
  hint?: string;
  error?: string;
}

const Checkbox = React.forwardRef(
  (
    {
      onChange,
      hint,
      value,
      ...props
    }: Omit<JoyCheckboxProps, keyof CheckboxProps> & CheckboxProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const changeHandler = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      },
      [onChange]
    );

    return (
      <FormControl>
        <JoyCheckbox
          checked={Boolean(value)}
          ref={ref}
          onChange={changeHandler}
          value={value.toString()}
          {...props}
        />
        {hint && <FormHelperText>{hint}</FormHelperText>}
      </FormControl>
    );
  }
);

export default React.memo(Checkbox);
