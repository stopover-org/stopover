import React from "react";
import { Select, Option } from "@mui/joy";
import countryCodeEmoji from "country-code-emoji";
import { InputProps as JoyInputProps } from "@mui/joy/Input/InputProps";
import Input from "../Input";
import { getCountryFromOffset } from "../../../lib/utils/timezones";
import { getCountryPhoneCodes } from "../../../lib/utils/phones";

export interface PhoneInputProps {
  onChange: (value: string) => void;
}

const PhoneInput = React.forwardRef(
  (
    {
      placeholder,
      onChange,
      ...props
    }: Omit<JoyInputProps, keyof PhoneInputProps> & PhoneInputProps,
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

    const onChangeHandler = (value: string) => {
      if (!value.startsWith(`+${countryPhoneCodes[country]}`)) {
        onChange(`+${countryPhoneCodes[country]}`);
        return;
      }
      onChange(value);
    };
    return (
      <Input
        startDecorator={
          <Select
            variant="plain"
            value={country}
            onChange={(_, value) => {
              if (!value) return;
              onChange(`+${countryPhoneCodes[value]}`);

              setCountry(value);
            }}
            sx={{ "&:hover": { bgcolor: "transparent" } }}
          >
            {Object.keys(countryPhoneCodes)
              .filter(Boolean)
              .map((countryCode: string) => (
                <Option value={countryCode}>
                  {countryCodeEmoji(countryCode)}
                  (+{countryPhoneCodes[countryCode]})
                </Option>
              ))}
          </Select>
        }
        ref={ref}
        placeholder={inputPlaceholder}
        onChange={onChangeHandler}
        {...props}
      />
    );
  }
);

export default React.memo(PhoneInput);
