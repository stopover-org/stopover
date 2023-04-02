import { getCodes } from "country-list";
import * as countryCodes from "../data/countyPhoneCodes.json";

export function getCountryPhoneCodes() {
  const countries = getCodes().map((code) => code);

  return Object.keys(countryCodes)
    .sort()
    .reduce((acc: { [key: string]: string }, code) => {
      // @ts-ignore
      if (countryCodes[code] === "") return acc;
      // @ts-ignore
      if (!countries.find((country) => country === code)) return acc;
      // @ts-ignore
      // eslint-disable-next-line prefer-destructuring
      acc[code] = countryCodes[code].replace("+", "").split("-")[0];

      return acc;
    }, {} as typeof countryCodes);
}
