import { Moment } from "moment";
import React from "react";
import { ClickAwayListener } from "@mui/base";
import { Stack } from "@mui/joy";
import Button from "../Button";
import DatePicker from "../DatePicker";
import { ButtonProps } from "../Button/Button";
import { DatePickerProps } from "../DatePicker/DatePicker";

interface BaseButtonDatePickerProps {
  children: React.ReactNode;
  onChange: (date: Moment | null) => void;
  datePickerProps?: DatePickerProps;
}

interface ButtonDatePickerProps
  extends Omit<ButtonProps, keyof BaseButtonDatePickerProps>,
    BaseButtonDatePickerProps {}

const ButtonDatePicker = ({
  children,
  onChange,
  datePickerProps,
  ...buttonProps
}: ButtonDatePickerProps) => {
  const [opened, setOpened] = React.useState(false);
  const wrapperRef = React.useRef(null);
  return (
    <ClickAwayListener
      onClickAway={() => {
        setOpened(false);
      }}
    >
      <Stack ref={wrapperRef}>
        <Button onClick={() => setOpened(!opened)} {...buttonProps}>
          {children}
        </Button>
        <DatePicker
          open={opened}
          onChange={(...rest) => {
            onChange(...rest);

            setOpened(false);
          }}
          {...datePickerProps}
          slots={{
            field: () => null,
            textField: () => null,
            ...datePickerProps?.slots,
          }}
          slotProps={{
            popper: {
              anchorEl: wrapperRef.current,
              ...datePickerProps?.slotProps?.popper,
            },
            ...datePickerProps?.slotProps,
          }}
        />
      </Stack>
    </ClickAwayListener>
  );
};

export default React.memo(ButtonDatePicker);
