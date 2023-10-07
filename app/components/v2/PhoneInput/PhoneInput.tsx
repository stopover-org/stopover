import React from "react";
import examples from "libphonenumber-js/mobile/examples";
import { InputProps as JoyInputProps } from "@mui/joy/Input/InputProps";
import { FieldError } from "react-hook-form";
import {
  CountryCode,
  formatIncompletePhoneNumber,
  getCountryCallingCode,
  getExampleNumber,
} from "libphonenumber-js";
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
    const defaultCountry = React.useMemo(
      () => getCountryFromOffset() || "RU",
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

    return (
      <Input
        startDecorator={
          <CountryCodesAutocomplete
            selectedCountry={country}
            onChange={onChange}
            onCountryChange={setCountry}
            width={focusedInput ? "100px" : "150px"}
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
