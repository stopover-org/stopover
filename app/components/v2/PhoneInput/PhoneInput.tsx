import ReactPhoneInput, { PhoneInputProps } from "react-phone-input-2";
import React from "react";
import styled from "styled-components";
import Typography from "../Typography";
import { TypographySize } from "../../StatesEnum";

const SPhoneInput = styled(({ className, ...rest }) => (
  <ReactPhoneInput
    containerClass={className}
    containerStyle={{
      padding: "10px 10px 10px 0",
      border: "1px solid gray",
      borderRadius: "1px",
    }}
    inputStyle={{
      fontSize: "18px",
      border: "none",
      height: "unset",
    }}
    {...rest}
  />
))`
  & > .flag-dropdown {
    background-color: unset;
    border: unset;
    border-radius: unset;
  }
`;

const PhoneInput = React.forwardRef(
  ({ label, ...props }: PhoneInputProps & { label: string }) => (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label>
      <Typography size={TypographySize.BIG}>{label}</Typography>
      <SPhoneInput {...props} />
    </label>
  )
);

export default React.memo(PhoneInput);
