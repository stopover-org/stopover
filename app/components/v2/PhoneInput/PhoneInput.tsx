import React from "react";
import { Select, Option } from "@mui/joy";
import countryCodeEmoji from "country-code-emoji";
import { InputProps as JoyInputProps } from "@mui/joy/Input/InputProps";
import Input from "../Input";
import { getCountryFromOffset } from "../../../lib/utils/timezones";
import { getCountryPhoneCodes } from "../../../lib/utils/phones";

export interface PhoneInputProps {
  onChange: (value: string) => void;
  value: string;
  error: boolean;
}

const PhoneInput = ({
  placeholder,
  onChange,
  value,
  error,
  ...props
}: Omit<JoyInputProps, keyof PhoneInputProps> & PhoneInputProps) => {
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
              <Option value={countryCode}>
                {countryCodeEmoji(countryCode)}
                (+{countryPhoneCodes[countryCode]})
              </Option>
            ))}
        </Select>
      }
      placeholder={inputPlaceholder}
      onChange={onChangeHandler}
      value={value}
      error={error}
      {...props}
    />
  );
};
export default React.memo(PhoneInput);
