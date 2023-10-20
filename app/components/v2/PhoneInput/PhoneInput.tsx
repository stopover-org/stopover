import React from "react";
import examples from "libphonenumber-js/mobile/examples";
import { InputProps as JoyInputProps } from "@mui/joy/Input/InputProps";
import { FieldError } from "react-hook-form";
import {
  CountryCode,
  formatIncompletePhoneNumber,
  getCountryCallingCode,
  getExampleNumber,
  parsePhoneNumber,
} from "libphonenumber-js";
import { useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import Input from "../Input";
import { getCountryFromOffset } from "../../../lib/utils/timezones";
import CountryCodesAutocomplete from "./CountryCodesAutocomplete";

export interface PhoneInputProps {
  onChange: (value: string) => void;
  value: string;
  error?: FieldError;
  label: string;
}

const PhoneInput = React.forwardRef(
  (
    {
      placeholder,
      onChange,
      value,
      label,
      ...props
    }: Omit<Omit<JoyInputProps, keyof PhoneInputProps>, "ref"> &
      PhoneInputProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [focusedInput, setFocusedInput] = React.useState(false);
    const parsedPhoneNumber = React.useMemo(() => {
      try {
        return parsePhoneNumber(value);
      } catch (error) {
        return undefined;
      }
    }, [value]);

    const defaultCountry = React.useMemo(
      () => parsedPhoneNumber?.country || getCountryFromOffset() || "RU",
      []
    );
    const [country, setCountry] = React.useState(defaultCountry);

    React.useEffect(() => {
      if (defaultCountry) {
        onChange(`+${getCountryCallingCode(country as CountryCode)}`);
      }
    }, []);

    const onChangeHandler = (val: string) => {
      onChange(formatIncompletePhoneNumber(val));
    };
    const sample = getExampleNumber(country as CountryCode, examples);
    const inputPlaceholder = sample ? sample.number : "Choose country";
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
    const focusedWidth = React.useMemo(
      () => (isMobileView ? "75px" : "100px"),
      [isMobileView]
    );

    return (
      <Input
        startDecorator={
          <CountryCodesAutocomplete
            selectedCountry={country}
            onChange={onChange}
            onCountryChange={setCountry}
            width={focusedInput ? focusedWidth : "150px"}
          />
        }
        placeholder={inputPlaceholder}
        onChange={onChangeHandler}
        value={value ? formatIncompletePhoneNumber(value) : ""}
        label={label}
        sx={{ padding: 0 }}
        onFocus={() => setFocusedInput(true)}
        onBlurCapture={() => setFocusedInput(false)}
        {...props}
      />
    );
  }
);
export default React.memo(PhoneInput);
