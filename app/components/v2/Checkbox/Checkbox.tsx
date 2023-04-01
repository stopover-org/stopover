import React, { ForwardedRef } from "react";
import {
  Checkbox as JoyCheckbox,
  CheckboxProps as JoyCheckboxProps,
} from "@mui/joy";

export interface CheckboxProps {
  onChange: (value: boolean | string | number) => void;
}

const Checkbox = React.forwardRef(
  (
    {
      onChange,
      ...props
    }: Omit<JoyCheckboxProps, keyof CheckboxProps> & CheckboxProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };
    return <JoyCheckbox ref={ref} onChange={changeHandler} {...props} />;
  }
);

export default React.memo(Checkbox);
