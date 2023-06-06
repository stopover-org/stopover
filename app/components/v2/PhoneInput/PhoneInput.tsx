import React from "react";
import { Select, Option } from "@mui/joy";
import countryCodeEmoji from "country-code-emoji";
import { InputProps as JoyInputProps } from "@mui/joy/Input/InputProps";
import { FieldError } from "react-hook-form";
import Input from "../Input";
import { getCountryFromOffset } from "../../../lib/utils/timezones";
import { getCountryPhoneCodes } from "../../../lib/utils/phones";

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
    const countryPhoneCodes = getCountryPhoneCodes();
    const defaultCountry = React.useMemo(
      () => getCountryFromOffset() || "RU",
      []
    );
    const [country, setCountry] = React.useState(defaultCountry);
    const inputPlaceholder =
      placeholder || country
        ? `+${countryPhoneCodes[country]}`
        : "Choose country";

    React.useEffect(() => {
      if (defaultCountry) {
        onChange(`+${countryPhoneCodes[country]}`);
      }
    }, []);

    const onChangeHandler = (val: string) => {
      if (!val.startsWith(`+${countryPhoneCodes[country]}`)) {
        onChange(`+${countryPhoneCodes[country]}`);
        return;
      }
      onChange(val);
    };
    return (
      <Input
        startDecorator={
          <Select
            variant="plain"
            value={country}
            onChange={(_, val) => {
              if (!val) return;
              onChange(`+${countryPhoneCodes[val]}`);

              setCountry(val);
            }}
            sx={{ "&:hover": { bgcolor: "transparent" } }}
          >
            {Object.keys(countryPhoneCodes)
              .filter(Boolean)
              .map((countryCode: string) => (
                <Option key={countryCode} value={countryCode}>
                  {countryCodeEmoji(countryCode)}
                  (+{countryPhoneCodes[countryCode]})
                </Option>
              ))}
          </Select>
        }
        placeholder={inputPlaceholder}
        onChange={onChangeHandler}
        value={value}
        label={label}
        {...props}
      />
    );
  }
);
export default React.memo(PhoneInput);
